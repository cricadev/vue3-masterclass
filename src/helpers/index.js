export const findById = (resources, id) => resources.find((r) => r.id === id)
export const findIndexById = (resources, id) => resources.findIndex((r) => r.id === id)
export const upsert = (resources, resource) => {
  const index = resources.findIndex((r) => r.id === resource.id)
  if (resource.id && index !== -1) {
    resources[index] = resource
  } else {
    resources.push(resource)
  }
}

export function makeAppendChildToParentMutation({ parent, child }) {
  return ({ childId, parentId }) => {
    const resource = findById(parent, parentId)
    if (!resource[child]) {
      resource[child] = []
    }
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}

// const appendPostToThread = async (post: any) => {
//   const thread = await findThreadById(post.threadId)
//   thread.posts = thread?.posts || []
//   thread?.posts?.push(post.threadId)
// }
// const appendContributorToThread = async (post: any) => {
//   const thread = await findThreadById(post.threadId)
//   thread.contributors = thread?.contributors || []
//   thread?.contributors?.push(post.userId)
// }
