import { json } from "@remix-run/node";
import { getEmployees, saveEmployee } from "~/modules/employee/service";

import type { ActionArgs } from "@remix-run/node";
import { corsHeader } from "~/utils";

export async function loader() {
  return json(await getEmployees(), corsHeader);
}
export async function action({ request }: ActionArgs) {
  const formData = await request.json();
  const newEmployee = await saveEmployee(formData);
  return json(newEmployee, corsHeader);
}
