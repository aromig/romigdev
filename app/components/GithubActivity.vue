<script setup lang="ts">
const config = useRuntimeConfig()
const { data: contributions } = await useAsyncData("contributions", () =>
  $fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.githubToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `query {
                user(login: "aromig") {
                    contributionsCollection {
                    commitContributionsByRepository(maxRepositories: 4) {
                        repository {
                        name
                        url
                        }
                        contributions(first: 10) {
                            nodes {
                                commitCount
                                occurredAt
                                url
                            }
                        }
                    }
                    }
                }
            }`
    })
  })
)

const contributionsArray =
  contributions.value.data.user.contributionsCollection
    .commitContributionsByRepository
</script>

<template>
  <section class="github-activity">
    <h2>Recent GitHub Contributions</h2>
    <div class="card-grid">
      <div
        class="repo-card"
        v-for="repo in contributionsArray || []"
        :key="repo.repository.name"
      >
        <div class="repo-header">
          <h3 class="repo-title">
            <a :href="repo.repository.url" target="_blank">
              {{ repo.repository.name }}
            </a>
          </h3>
          <span class="commit-badge">
            {{
              repo.contributions.nodes.reduce(
                (sum, c) => sum + c.commitCount,
                0
              )
            }}
            commits
          </span>
        </div>
        <ul class="commit-list">
          <li
            v-for="contribution in repo.contributions.nodes"
            :key="contribution.occurredAt"
          >
            <a :href="contribution.url" target="_blank">
              {{ new Date(contribution.occurredAt).toLocaleDateString() }}
            </a>
            – {{ contribution.commitCount }}
            {{ contribution.commitCount === 1 ? "commit" : "commits" }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.github-activity {
  margin-top: 2rem;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .repo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .commit-badge {
    background-color: #eaeaea;
    color: #444;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    white-space: nowrap;
    font-weight: 500;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .repo-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .repo-title {
      margin: 0 0 0.75rem;
      font-size: 1.2rem;

      a {
        color: #0366d6;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .commit-list {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;

        a {
          font-weight: 500;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
