import { Container, ContainerProperties } from '@react-three/uikit'
import React, { ReactNode, forwardRef } from 'react'
import { borderRadius, colors } from './theme.js'

export type CardProperties = ContainerProperties

export const Card = forwardRef(
  ({ children, ...props }: CardProperties, ref) => {
    return (
      <Container
        flexDirection="column"
        borderRadius={borderRadius.lg}
        borderWidth={1}
        backgroundColor={colors.card}
        ref={ref}
        {...props}
      >
        <Container display="contents" {...{ '*': { color: colors.cardForeground } }}>{children}</Container>
      </Container>
    )
  },
)

export type CardHeaderProperties = ContainerProperties

export const CardHeader = forwardRef(
  (props: CardHeaderProperties, ref) => {
    return <Container padding={24} flexDirection="column" gap={6} ref={ref} {...props} />
  },
)

export type CardTitleProperties = { children?: ReactNode }

export function CardTitle(props: CardTitleProperties) {
  return <Container display="contents" {...{ '*': { fontWeight: "semi-bold", letterSpacing: -0.4, fontSize: 24, lineHeight: "100%" } }} {...props} />
}

export type CardDescriptionProperties = { children?: ReactNode }

export function CardDescription(props: CardDescriptionProperties) {
  return <Container display="contents" {...{ '*': { fontSize: 14, lineHeight: 20, color: colors.mutedForeground } }} {...props} />
}

export type CardContentProperties = ContainerProperties

export const CardContent = forwardRef(
  (props: CardContentProperties, ref) => {
    return <Container padding={24} paddingTop={0} ref={ref} {...props} />
  },
)

export type CardFooterProperties = ContainerProperties

export const CardFooter = forwardRef(
  (props: CardFooterProperties, ref) => {
    return <Container flexDirection="row" alignItems="center" padding={24} paddingTop={0} ref={ref} {...props} />
  },
)
