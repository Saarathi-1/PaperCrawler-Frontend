import React from 'react'
import ProfileCard from '../Home/ProfileCard'
import { Text,Flex } from "@chakra-ui/react"

function Contact() {
  return (
    <>
      <Text fontSize="4xl" align="center" justify="center" m={10}>
        Contact Us
      </Text>
      <Flex align="center" justify="center" h="" gap={10} m={0} p={0} wrap="wrap">

          <ProfileCard url="" name="Vaibhavi" description="Developer" linkedin="https://linkedin.com/in/vaibhavi-kadam2701/" github="https://github.com/vaibhu4coding" email="mailto:kadamvaibhavi2701@gmail.com" />

          <ProfileCard url="" name="Suraj" description="Developer" linkedin="" email="mailto:surajpattade@gmail.com" />

          <ProfileCard url="" name="Roshan" description="Developer" linkedin="" github="" email="mailto:roshannakate24@gmail.com" />
        {/* <HStack gap={20} >
        </HStack> */}

          <ProfileCard url="" name="Mihir" description="Developer" linkedin="" email="mailto:mihirmitkari25@gmail.com" />

          
        {/* <HStack  gap={20}>
        </HStack> */}
      </Flex>
    </>
  )
}

export default Contact