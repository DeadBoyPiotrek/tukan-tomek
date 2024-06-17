'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphIdSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveGraphId } from '@/lib/localStorage';
export const GraphIdInput = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(graphIdSchema),
  });

  type Inputs = Zod.infer<typeof graphIdSchema>;

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const id = data.id;
    const response = await fetch(`/api/graph?id=${id}}`, {
      method: 'GET',
    });
    console.log(`🚀 ~ GraphIdInput ~ response:`, response);

    const result = await response.json();
    console.log(`🚀 ~ GraphIdInput ~ result:`, result);
    if (result?.id) saveGraphId(result.id);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  justify-center flex-col gap-3"
    >
      <label className="text-white">Graph Id</label>
      <input {...register('id')} className="text-black" />
      {errors && <p className="text-red-500 ">{errors.id?.message}</p>}

      <button className="border p-2 rounded-sm">Load</button>
    </form>
  );
};
