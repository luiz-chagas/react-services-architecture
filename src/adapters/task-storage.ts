import { Task } from "../models/task";
import { StorageService } from "./../services/storage";

const remove: StorageService<Task>["remove"] = (id) =>
  new Promise((resolve, reject) => {
    sessionStorage.removeItem(id);
    resolve();
  });

const save: StorageService<Task>["save"] = (data) =>
  new Promise((resolve, reject) => {
    sessionStorage.setItem(data.id, JSON.stringify(data));
    resolve(data);
  });

const findById: StorageService<Task>["findById"] = (id) =>
  new Promise((resolve, reject) => {
    const stringifiedItem = sessionStorage.getItem(id);
    if (!stringifiedItem) {
      return reject("No records found");
    }
    return resolve(JSON.parse(stringifiedItem));
  });

const findAll: StorageService<Task>["findAll"] = () =>
  new Promise((resolve, reject) => {
    const stringifiedItems = Object.keys(sessionStorage).map((key) =>
      sessionStorage.getItem(key)
    ) as string[];

    return resolve(
      stringifiedItems
        .map((item) => JSON.parse(item))
        .filter((item) => item.type === "task")
    );
  });

const create: StorageService<Task>["create"] = (data) => {
  const id = String(Math.random());
  const finalData = { ...data, id };
  sessionStorage.setItem(id, JSON.stringify(finalData));
  return Promise.resolve(finalData);
};

export const LocalTaskStorage: StorageService<Task> = {
  open: () => Promise.resolve(),
  close: () => Promise.resolve(),
  remove,
  create,
  save,
  findById,
  findAll,
};
