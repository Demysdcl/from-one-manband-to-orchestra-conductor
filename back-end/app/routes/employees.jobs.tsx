import { json } from "@remix-run/node";
import { getJobs } from "~/modules/employee/service";
import { corsHeader } from "~/utils";

export async function loader() {
  return json(await getJobs(), corsHeader);
}
