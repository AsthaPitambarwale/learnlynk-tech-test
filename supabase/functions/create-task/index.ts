import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const { application_id, task_type, due_at } = await req.json();

    const validTypes = ["call", "email", "review"];
    if (!validTypes.includes(task_type)) {
      return new Response(JSON.stringify({ error: "Invalid task_type" }), {
        status: 400,
      });
    }

    if (new Date(due_at) <= new Date()) {
      return new Response(JSON.stringify({ error: "due_at must be in future" }), {
        status: 400,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        related_id: application_id,
        type: task_type,
        due_at,
        title: `Task: ${task_type}`
      })
      .select()
      .single();

    if (error) throw error;

    // Realtime Broadcast
    await supabase.realtime.send({
      event: "task.created",
      payload: data
    });

    return new Response(
      JSON.stringify({ success: true, task_id: data.id }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
});
