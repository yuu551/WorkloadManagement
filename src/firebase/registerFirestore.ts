import { db } from "./init";
import { Workload } from "../types/Workload";
import { Category } from "../types/Category";

const registWorkload = async (data: Workload) => {
  await db.runTransaction(async (transaction) => {
    const workloadsRef = await db.collection("workloads");
    const newWorkloadsRef = await workloadsRef.doc();

    await transaction.get(newWorkloadsRef).then(async () => {
      // 最新のtodoを1件のみ取得
      const querySnapshot = await workloadsRef
        .orderBy("workload_id", "desc")
        .limit(1)
        .get();
      if (!querySnapshot) {
        await newWorkloadsRef.set(data);
        return;
      }
      const latestNum: Workload = querySnapshot.docs.map((workloadData) => {
        return workloadData.data() as Workload;
      })[0];
      const newData = {
        ...data,
        workload_id: latestNum.workload_id + 1,
      };
      await transaction.set(newWorkloadsRef, newData);
    });
  });
  return data;
};

const registCategory = async (data: Category) => {
  await db.runTransaction(async (transaction) => {
    const CategoryRef = await db.collection("categories");
    const newCategoryRef = await CategoryRef.doc();

    await transaction.get(newCategoryRef).then(async () => {
      // 最新のtodoを1件のみ取得
      const querySnapshot = await CategoryRef.orderBy("category_id", "desc")
        .limit(1)
        .get();
      if (!querySnapshot) {
        await newCategoryRef.set(data);
        return;
      }
      const latestNum: Category = querySnapshot.docs.map((categoryData) => {
        return categoryData.data() as Category;
      })[0];
      const newData = {
        ...data,
        category_id: latestNum ? latestNum.category_id + 1 : 0,
      };
      await transaction.set(newCategoryRef, newData);
    });
  });
  return data;
};

export { registWorkload, registCategory };
