import { User } from "../models/user";
import { StorageService } from "./../services/storage";

const remove: StorageService<User>["remove"] = (id) =>
  new Promise((resolve, reject) => {
    sessionStorage.removeItem(id);
    resolve();
  });

const save: StorageService<User>["save"] = (data) =>
  new Promise((resolve, reject) => {
    sessionStorage.setItem(data.id, JSON.stringify(data));
    resolve(data);
  });

const findById: StorageService<User>["findById"] = (id) =>
  new Promise((resolve, reject) => {
    const stringifiedItem = sessionStorage.getItem(id);
    if (!stringifiedItem) {
      return reject("No records found");
    }
    return resolve(JSON.parse(stringifiedItem));
  });

const findAll: StorageService<User>["findAll"] = () =>
  new Promise((resolve, reject) => {
    const stringifiedItems = Object.keys(sessionStorage).map((key) =>
      sessionStorage.getItem(key)
    ) as string[];

    return resolve(
      stringifiedItems
        .map((item) => JSON.parse(item))
        .filter((item) => item.type === "user")
    );
  });

const create: StorageService<User>["create"] = (data) => {
  const id = String(Math.random());
  const finalData = { ...data, id };
  sessionStorage.setItem(id, JSON.stringify(finalData));
  return Promise.resolve(finalData);
};

export const LocalUserStorage: StorageService<User> = {
  open: () => Promise.resolve(),
  close: () => Promise.resolve(),
  remove,
  create,
  save,
  findById,
  findAll,
};
