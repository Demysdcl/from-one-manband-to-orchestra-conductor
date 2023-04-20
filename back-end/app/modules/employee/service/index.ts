import type { Employee } from "@prisma/client";
import { db } from "~/db";

export const getEmployees = async () => db.employee.findMany();

export const findEmployee = async (id: string) =>
  db.employee.findUnique({ where: { id } });

export const saveEmployee = async (data: Employee) =>
  db.employee.create({ data });

export const updateEmployee = async (id: string, data: Partial<Employee>) =>
  db.employee.update({
    where: { id },
    data,
  });

export const deleteEmployee = async (id: string) =>
  db.employee.delete({
    where: { id },
  });

export const getJobs = async () => {
  const employees = await db.employee.findMany();
  const jobs = employees.map(({ job }) => job);
  return Array.from(new Set(jobs));
};

export const getCities = async () => {
  const employees = await db.employee.findMany();
  const cities = employees.map(({ city }) => city);
  return Array.from(new Set(cities));
};
