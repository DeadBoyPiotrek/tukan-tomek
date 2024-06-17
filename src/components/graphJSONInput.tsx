'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphDataSchema, graphIdSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveGraphId } from '@/lib/localStorage';
export const GraphJSONInput = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(graphDataSchema),
  });

  type Inputs = Zod.infer<typeof graphDataSchema>;

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const graphData = data.graphData;
    const response = await fetch('/api/graph', {
      method: 'POST',
      body: JSON.stringify({ data: graphData }),
    });

    const result = await response.json();
    if (result.id) saveGraphId(result.id);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center flex-col gap-3"
    >
      <label className="text-white">Graph Data (JSON format)</label>
      <input {...register('graphData')} className="text-black" />
      {errors && <p className="text-red-500 ">{errors.graphData?.message}</p>}

      <button className="border p-2 rounded-sm">Submit</button>
    </form>
  );
};
