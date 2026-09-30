# 技术决策：Vue Query 与 Nuxt 数据获取的职责边界

> 日期：2026-08-17  
> 决策：Gnuxter 默认安装并完成 `@tanstack/vue-query` 的 SSR 安全初始化，但只允许项目按业务域选择性使用，不替代 Nuxt 原生数据层。

## 为什么不默认接管数据请求

Nuxt 4 的 `useFetch` / `useAsyncData` 已覆盖 starter 的默认需求：服务端取数、页面渲染、把结果写入 Nuxt payload、客户端水合时复用、按 key 共享状态、并发去重、刷新与清理。对内容页、详情页、SEO 页面和简单表单而言，把请求迁移到 Vue Query 会形成第二套缓存、失效和 SSR 水合机制，收益不足以抵消复杂度。

Vue Query 的优势不在“能发请求”，而在长期客户端 server-state 管理：可配置的新鲜度与回收时间、跨组件缓存、后台刷新、自动重试、mutation、细粒度失效以及可回滚的乐观更新。依赖和 SSR 插件已准备好，产品只在确实需要这些能力的业务域启用。

## 能力对比

| 维度 | Nuxt `useFetch` / `useAsyncData` | TanStack Vue Query |
| --- | --- | --- |
| SSR / 水合 | Nuxt 自动等待服务端数据并序列化到 payload，客户端水合时自动复用 | 需要 Nuxt plugin、请求级 `QueryClient`、服务端预取以及 `dehydrate` / `hydrate` |
| 缓存生命周期 | 以 Nuxt payload、静态数据和组件使用的 key 为中心；Nuxt 4 在最后一个消费者卸载后清理 AsyncData | 以 `QueryClient` 和 `queryKey` 为中心；数据默认立即 stale，非活跃 query 默认保留 5 分钟后回收 |
| 请求去重 | 相同显式 key 共享 refs；并发执行可选 `cancel` / `defer`。相同 URL 在不同源码位置默认可能生成不同 key，跨组件共享时应显式指定 key | 相同 `queryKey` 共享 query 缓存和观察状态，适合多处长期订阅同一远端资源 |
| 刷新 / 失效 | `refresh`、`refreshNuxtData`、`clearNuxtData`；适合页面级刷新 | `invalidateQueries`、query filters、mutation 回调；适合复杂资源依赖关系 |
| 重试 | `useAsyncData` 本身没有与 Query 等价的统一声明式重试生命周期，简单场景可在请求层处理 | 查询失败默认重试 3 次并采用指数退避，也可全局或逐 query 配置 |
| 乐观更新 | 可以通过 `useNuxtData` 手工修改缓存并自行处理失败恢复 | `useMutation` 提供 `onMutate`、取消请求、快照、回滚和失效刷新的一整套流程 |

## 是否冲突

两者可以安装在同一个 Nuxt 应用中，不存在框架级冲突；真正的问题是**同一份远端资源不能同时由两套缓存拥有**。否则会出现：

- SSR payload 和 Query cache 各保存一份数据。
- mutation 后只刷新其中一套，页面显示不一致。
- 水合后 Query 默认 `staleTime: 0`，可能在 Nuxt 已提供首屏数据后再次请求。
- 两套 key、错误、loading 和失效规则增加排查成本。

## 职责划分

默认使用 Nuxt 原生数据层：

- 路由首屏、SEO、SSG / SSR 内容。
- 只在当前页面使用的详情和列表。
- 需要自动转发 SSR 请求 cookies / headers 的同源接口。
- 简单提交：事件中使用 `$fetch`，完成后刷新对应 Nuxt data key。

满足以下条件时，为对应业务域启用 Vue Query：

- 同一资源被多个页面或多个交互组件长期订阅。
- mutation 频繁，存在明确的 query 失效关系。
- 需要后台刷新、窗口聚焦刷新、轮询或统一重试策略。
- 需要分页、无限列表或失败可回滚的乐观更新。
- 应用本质上是消费独立 API 的高交互客户端产品。

启用后的约束：

1. 按业务域选择唯一缓存所有者；不要对同一 query 同时使用 `useFetch` 和 `useQuery`。
2. Vue Query 的 `queryFn` 使用 `$fetch` 或独立 API client，不在其中调用 `useFetch`。
3. 需要 SSR 的 Vue Query 页面按官方方案预取并水合；设置符合业务的新鲜度，避免水合后无意义的二次请求。
4. 只使用 Nuxt 原生数据的页面继续保持原样，不必全项目迁移。

## 结论状态

- **Inspected**：Nuxt 官方文档确认 `useFetch` / `useAsyncData` 的 payload 水合、key 共享、`dedupe`、缓存读取、刷新与卸载清理行为。
- **Inspected**：TanStack 官方文档确认 Query 的 SSR 需要显式 dehydrate / hydrate；默认 `staleTime` 为 0、非活跃缓存默认 5 分钟回收、查询默认重试 3 次，并提供失效与乐观更新流程。
- **Assumed**：Gnuxter 当前没有复杂跨页面远端状态需求，因此 Vue Query 暂不接管现有页面数据；后续项目满足上述触发条件时，可直接按业务域启用。

## 官方资料

- [Nuxt 4：Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Nuxt 4：useAsyncData](https://nuxt.com/docs/4.x/api/composables/use-async-data)
- [Nuxt 4：数据生命周期变更](https://nuxt.com/docs/4.x/getting-started/upgrade)
- [Nuxt 4：useNuxtData](https://nuxt.com/docs/4.x/api/composables/use-nuxt-data)
- [TanStack Vue Query：Important Defaults](https://tanstack.com/query/latest/docs/framework/vue/guides/important-defaults)
- [TanStack Vue Query：SSR & Nuxt](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr)
- [TanStack Vue Query：Query Invalidation](https://tanstack.com/query/latest/docs/framework/vue/guides/query-invalidation)
- [TanStack Vue Query：Optimistic Updates](https://tanstack.com/query/latest/docs/framework/vue/guides/optimistic-updates)
