"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../src/lib/supabase";

export default function TodayPage() {
  const qc = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ["tasks-today"],
    queryFn: async () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .gte("due_at", start.toISOString())
        .lte("due_at", end.toISOString());

      if (error) throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase
        .from("tasks")
        .update({ status: "completed" })
        .eq("id", taskId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries(["tasks-today"]),
  });

  if (tasksQuery.isLoading) return <p>Loading…</p>;
  if (tasksQuery.error) return <p>Error loading tasks</p>;

  return (
    <div>
      <h2>Tasks Due Today</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Application ID</th>
            <th>Due</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasksQuery.data?.map((t: any) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.related_id}</td>
              <td>{new Date(t.due_at).toLocaleString()}</td>
              <td>{t.status}</td>
              <td>
                <button
                  onClick={() => mutation.mutate(t.id)}
                  disabled={mutation.isPending}
                >
                  Mark Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
