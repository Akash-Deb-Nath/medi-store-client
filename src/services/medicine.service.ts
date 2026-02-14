import { env } from "@/env";

const API_URL = env.API_URL;
export const medicineService = {
  getMedicines: async function () {
    try {
      const res = await fetch(`${API_URL}/medicines`);
      const data = await res.json();
      console.log({ data });
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getMedicinesBySeller: async function () {
    try {
      const res = await fetch(`${API_URL}/medicines/seller`);
      const data = await res.json();
      console.log({ data });
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getMedicinesById: async function (medicineId: string) {
    try {
      const res = await fetch(`${API_URL}/medicines/${medicineId}`);
      const data = await res.json();
      console.log({ data });
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
