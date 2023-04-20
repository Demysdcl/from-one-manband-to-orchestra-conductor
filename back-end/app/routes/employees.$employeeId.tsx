import { json } from "@remix-run/node";

import type { ActionArgs } from "@remix-run/node";
import {
  deleteEmployee,
  findEmployee,
  updateEmployee,
} from "~/modules/employee/service";
import { corsHeader } from "~/utils";

export async function loader({ params }: ActionArgs) {
  return json(await findEmployee(params.employeeId ?? ""), corsHeader);
}

export async function action({ request, params }: ActionArgs) {
  switch (request.method) {
    case "PUT": {
      const response = await updateEmployee(
        params.employeeId ?? "",
        await request.json()
      );
      return json(response, corsHeader);
    }
    case "DELETE": {
      await deleteEmployee(params.employeeId ?? "");
      return json("Employee removed", corsHeader);
    }
    default:
      return json("Method unavaliable", corsHeader);
  }
}
