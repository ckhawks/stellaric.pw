import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const interests = {
  coding: [
    "Database design & administration",
    "Game modding (Unity, content)",
    "Web development & fullstack APIs",
    "Game development (Godot, high-level)",
    "Scripting, scraping, automation bots",
    "Server infrastructure & DevOps",
    "UX design & interface systems",
  ],
  creative: [
    "Low poly 3D modeling (weapons, props, environments)",
    "Event video production (TD, replays, graphics, vMix)",
    "Photography (landscape, film, street)",
    "DJing & music production",
    "Stage lighting & production (DMX, TouchDesigner)",
    "Fast-paced mechanical games",
    "Deep crafting & simulation games",
    "Community management",
    "Digital media archiving",
  ],
}

export function InterestsSection() {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold">
        <span className="text-accent">&gt;</span> INTERESTS
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-accent">//</span>
              CODING_RELATED
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {interests.coding.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-accent">//</span>
              OTHER_INTERESTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {interests.creative.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
