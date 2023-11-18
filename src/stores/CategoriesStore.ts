import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from "pinia";
import sourceData from "@/data.json"


export const useCategoriesStore = defineStore("CategoriesStore", () => {
  const categories = ref(sourceData.categories);
  return {
    categories
  }
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCategoriesStore, import.meta.hot)
  );
}
