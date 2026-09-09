"use client"

import { useLang } from "@/components/site/lang-provider"
import { Chip } from "@/components/site/primitives"

export function RolesChip({ count }: { count: number }) {
  const { t } = useLang()
  return (
    <Chip>
      {count} {t.roles}
    </Chip>
  )
}
