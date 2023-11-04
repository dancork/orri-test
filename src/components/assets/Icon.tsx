import * as React from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import {
  library,
  IconName,
  findIconDefinition,
  IconPrefix,
} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

type FontAwesomeSvgIconProps = React.ComponentPropsWithoutRef<
  typeof SvgIcon
> & {
  prefix?: IconPrefix
  icon: IconName
}

export const Icon = React.forwardRef<SVGSVGElement, FontAwesomeSvgIconProps>(
  ({ icon: iconName, prefix = 'fas', ...props }, ref) => {
    const iconDef = findIconDefinition({
      prefix,
      iconName,
    })

    if (!iconDef) return null

    const {
      icon: [width, height, , , svgPathData],
    } = iconDef

    return (
      <SvgIcon {...props} ref={ref} viewBox={`0 0 ${width} ${height}`}>
        {typeof svgPathData === 'string' ? (
          <path d={svgPathData} />
        ) : (
          /**
           * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
           * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
           * of a duotone icon. 40% is the default opacity.
           *
           * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
           */
          svgPathData.map((d: string, i: number) => (
            <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
          ))
        )}
      </SvgIcon>
    )
  },
)
