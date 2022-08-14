import { db } from "./init";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { Category } from "../types/Category";
import sha256 from "crypto-js/sha256";

const workloadsRef = collection(db, "workloads");
const categoriesRef = collection(db, "categories");

const getCategories = async () => {
  const categoriesData = (
    await getDocs(query(categoriesRef, orderBy("category_id")))
  ).docs;
  const categories: Category[] = categoriesData.map((category) => {
    return category.data() as Category;
  });
  return categories;
};

const getWorkloads = async (mailAddress: string) => {
  const hashedEmail = sha256(mailAddress).toString();
  const workloads = await getDocs(
    query(
      workloadsRef,
      where("user_mail_address", "==", hashedEmail),
      orderBy("work_day", "desc")
    )
  );
  return workloads;
};

export { getWorkloads, getCategories };
