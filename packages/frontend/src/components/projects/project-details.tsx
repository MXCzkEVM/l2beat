import { assertUnreachable } from '@l2beat/shared-pure'

import { ActivitySection } from './sections/activity-section'
import { ContractsSection } from './sections/contracts/contracts-section'
import { CostsSection } from './sections/costs/costs-section'
import { DaRiskSummarySection } from './sections/da-risk-summary-section'
import { DetailedDescriptionSection } from './sections/detailed-description-section'
import { GrissiniRiskAnalysisSection } from './sections/grissini-risk-analysis-section'
import { GroupSection } from './sections/group-section'
import { L3RiskAnalysisSection } from './sections/l3-risk-analysis-section'
import { MarkdownSection } from './sections/markdown-section'
import { MilestonesAndIncidentsSection } from './sections/milestones-and-incidents-section'
import { PermissionsSection } from './sections/permissions/permissions-section'
import { RiskAnalysisSection } from './sections/risk-analysis-section'
import { RiskSummarySection } from './sections/risk-summary-section'
import { SequencingSection } from './sections/sequencing-section'
import { StackedTvsSection } from './sections/stacked-tvs-section'
import { StageSection } from './sections/stage-section'
import { StateDerivationSection } from './sections/state-derivation-section'
import { StateValidationSection } from './sections/state-validation-section'
import { TechnologyChoicesSection } from './sections/technology-choices-section'
import { ThroughputSection } from './sections/throughput/throughput-section'
import { TvsSection } from './sections/tvs-section'
import type { ProjectDetailsSection } from './sections/types'
import { UpcomingDisclaimer } from './sections/upcoming-disclaimer'

export interface ProjectDetailsProps {
  nested?: boolean
  parentSection?: string
  items: ProjectDetailsSection[]
  isUpcoming?: boolean
}

export function ProjectDetails(props: ProjectDetailsProps) {
  return (
    <div>
      {props.items.map((item, index) => {
        const { nested } = props
        const sectionOrder = props.parentSection
          ? `${props.parentSection}.${index + 1}`
          : `${index + 1}`

        switch (item.type) {
          case 'StackedTvsSection':
            return (
              <StackedTvsSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'TvsSection':
            return (
              <TvsSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'ActivitySection':
            return (
              <ActivitySection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'CostsSection':
            return (
              <CostsSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'ThroughputSection':
            return (
              <ThroughputSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'DetailedDescriptionSection':
            return (
              <DetailedDescriptionSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'MilestonesAndIncidentsSection':
            return (
              <MilestonesAndIncidentsSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'RiskSummarySection':
            return (
              <RiskSummarySection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'DaRiskSummarySection':
            return (
              <DaRiskSummarySection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'RiskAnalysisSection':
            return (
              <RiskAnalysisSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'L3RiskAnalysisSection':
            return (
              <L3RiskAnalysisSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'StageSection':
            return (
              <StageSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'TechnologyChoicesSection':
            return (
              <TechnologyChoicesSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'StateDerivationSection':
            return (
              <StateDerivationSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'StateValidationSection':
            return (
              <StateValidationSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )

          case 'MarkdownSection':
            return (
              <MarkdownSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'SequencingSection':
            return (
              <SequencingSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'PermissionsSection':
            return (
              <PermissionsSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'ContractsSection':
            return (
              <ContractsSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'UpcomingDisclaimer':
            return <UpcomingDisclaimer key={`${item.type}${index}`} />
          case 'Group':
            return (
              <GroupSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          case 'GrissiniRiskAnalysisSection':
            return (
              <GrissiniRiskAnalysisSection
                key={item.props.id}
                {...{ nested, sectionOrder }}
                {...item.props}
              />
            )
          default:
            assertUnreachable(item)
        }
      })}
    </div>
  )
}
