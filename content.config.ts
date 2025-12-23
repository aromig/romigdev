import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/**/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        date: z.date(),
        cover: z.string()
      })
    }),
    content: defineCollection({
      type: "page",
      source: "*.md"
    }),
    resumeData: defineCollection({
      type: "data",
      include: "data/resume.json",
      schema: z.object({
        name: z.string(),
        title: z.string(),
        picture: z.string(),
        email: z.string(),
        phone: z.string(),
        website: z.string(),
        summary: z.string(),
        skills: z.array(
          z.object({
            name: z.string(),
            list: z.array(
              z.object({
                skill: z.string(),
                level: z.number().int()
              })
            )
          })
        ),
        education: z.array(
          z.object({
            institution: z.string(),
            area: z.string(),
            studyType: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            gpa: z.string(),
            highlights: z.array(z.string())
          })
        ),
        workExperience: z.array(
          z.object({
            company: z.string(),
            position: z.string(),
            website: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            summary: z.string(),
            highlights: z.array(z.string()),
            projects: z
              .array(
                z.object({
                  name: z.string(),
                  stack: z.string(),
                  stub: z.string()
                })
              )
              .optional()
          })
        ),
        personalProjects: z.array(
          z.object({
            name: z.string(),
            date: z.string(),
            stack: z.string(),
            stub: z.string(),
            url: z.string()
          })
        ),
        codeSamples: z.array(
          z.object({
            network: z.string(),
            username: z.string(),
            url: z.string()
          })
        )
      })
    })
  }
})
