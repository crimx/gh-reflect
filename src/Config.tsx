import { Button, FormControl, TextInput } from "@primer/react";
import { useState } from "react";

import { useLocalStorage } from "./useLocalStorage";

export interface ConfigProps {
  onSubmit: (options: Options) => void;
}

export interface Options {
  name: string;
  since: number;
  token?: string;
}

const nowInLocalTZ = /* @__PURE__ */ getDateInLocalTZ(new Date());

export function Config(props: ConfigProps) {
  const [name, setName] = useLocalStorage("gh-reflect.name", "");
  const [token, setToken] = useLocalStorage("gh-reflect.token", "");
  const [sinceInLocalTZ, setSinceInLocalTZ] = useState(getLastSatInLocalTZ);

  const hasNameError = !name;
  const hasError = hasNameError;

  const onSubmit = () => {
    const since = new Date(sinceInLocalTZ);
    since.setTime(since.getTime() + since.getTimezoneOffset() * 60 * 1000);
    props.onSubmit({ name, since: since.getTime(), token });
  };

  return (
    <div className="flex flex-col gap-5">
      <FormControl required>
        <FormControl.Label>Name</FormControl.Label>
        <FormControl.Caption>GitHub User Name to view events.</FormControl.Caption>
        {!name && <FormControl.Validation variant="error">Required</FormControl.Validation>}
        <TextInput onChange={e => setName(e.target.value)} value={name} />
      </FormControl>
      <FormControl required={false}>
        <FormControl.Label>Personal Access Token</FormControl.Label>
        <FormControl.Caption>
          A{" "}
          <a href="https://github.com/settings/tokens" target="_blank">
            GitHub PAT
          </a>{" "}
          with <strong>xxx</strong> permission.
        </FormControl.Caption>
        <TextInput onChange={e => setToken(e.target.value)} type="password" value={token} />
      </FormControl>
      <FormControl required>
        <FormControl.Label>Since</FormControl.Label>
        <FormControl.Caption>The date to start fetching events.</FormControl.Caption>
        <TextInput
          max={nowInLocalTZ}
          onChange={e => setSinceInLocalTZ(e.target.value)}
          type="date"
          value={sinceInLocalTZ}
        />
      </FormControl>
      <Button disabled={hasError} onClick={onSubmit} variant="primary">
        Submit
      </Button>
    </div>
  );
}

function getDateInLocalTZ(d: Date): string {
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const date = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${month}-${date}`;
}

function getLastSatInLocalTZ() {
  const now = new Date();
  now.setDate(now.getDate() - ((now.getDay() + 7 - 6) % 7) - (now.getDay() < 6 ? 7 : 0));
  return getDateInLocalTZ(now);
}
