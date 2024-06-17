import { GraphIdInput } from './graphIdInput';
import { GraphJSONInput } from './graphJSONInput';

export const Inputs = () => {
  return (
    <div className="flex gap-3">
      <GraphJSONInput />
      <GraphIdInput />
    </div>
  );
};
