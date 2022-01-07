import NProgress from 'nprogress'

NProgress.configure({ trickleRate: 0.01, trickleSpeed: 200 });

let offsetStart: ReturnType<typeof setTimeout>

const start = (offset = 200) => {
  offsetStart = setTimeout(NProgress.start, offset)
}
const end = () => {
  if (offsetStart) clearTimeout(offsetStart)
  NProgress.done(false)
}

export const useLoading = () => ({
  end, start,
})
