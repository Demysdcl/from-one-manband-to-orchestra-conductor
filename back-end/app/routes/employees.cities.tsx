import { json } from "@remix-run/node";
import { getCities } from "~/modules/employee/service";
import { corsHeader } from "~/utils";

export async function loader() {
  return json(await getCities(), corsHeader);
}
