import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";
import sourceData from "@/data.json"
import { usePostsStore } from "./PostsStore";
import { useThreadsStore } from "./ThreadsStore";
import { findById } from "@/helpers"
export const useUsersStore = defineStore("UsersStore", () => {

  const users = ref(sourceData.users)
  const authId = ref("s7Q8Zi2N1SPa5ahzssq9kbyp138")
  const authUser = computed(() => {
    return user.value(authId.value)
  })
  const user = computed(() => (id: string) => {
    const user = findById(users.value, id)
    if (!user) return null
    const { posts } = usePostsStore()
    const { threads } = useThreadsStore()

    const userPosts = posts.filter(post => post.userId === user.id)
    const userPostsCount = userPosts.length
    const userThreads = threads.filter(thread => thread.userId === user.id)
    const userThreadsCount = userThreads.length

    return {
      ...user,
      posts: userPosts,
      postsCount: userPostsCount,
      threads: userThreads,
      threadsCount: userThreadsCount
    }
  });

  const updateUser = (user: any) => {
    const index = users.value.findIndex((u: any) => u.id === user.id)
    users.value[index] = user
  }

  const findUserById = (id: string) => {
    return findById(users.value, id)
  }
  return {
    users,
    user,
    findUserById,
    authUser,
    authId,
    updateUser,

  }
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useUsersStore, import.meta.hot)
  );
}
