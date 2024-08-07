import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableCaption,
  TableContainer,
  Text,
  HStack,
  useDisclosure,
  VStack,
  Button
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useToast,
  ModalBody,
  FormLabel,
  Input,
  FormControl,
  ModalCloseButton,
} from '@chakra-ui/react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


function SubmittedProposals() {
  let toast = useToast();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000/api/proposal/submitted";
  const [data, setData] = useState([])

  const [evaluator, setEvaluatorScores] = useState([])

  const [fund, setFund] = useState("");
  const [duration, setDuration] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [reason, setReason] = useState("");


  const cancelRef = React.useRef()


  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET'
      }).then((response) => {
        response.json().then((json) => {
          // console.log(json.data)
          setData(json.data)
        })
      }).catch(error => {
        console.log(error)
      })
    }
    fetchData()
    // console.log(data)
    console.log(fund)
  }, []);


  const fundUrl = "http://localhost:5000/api/funding/give/"
  const rejectUrl = "http://localhost:5000/api/funding/reject/"
  const expertUrl = "http://localhost:5000/api/funding/send-to-experts/"
  const evaluatorUrl = "http://localhost:5000/api/funding/scores/"

  const rejectProposal = async (cid) => {
    const response = await fetch(rejectUrl + cid,
      {
        method: 'POST',
        headers: {
          'auth-token': sessionStorage.getItem("token"),
          'Content-Type': 'application/json',
          // 'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          reason: reason
        })
      })
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (data.success) {
      toast({
        title: data.message,
        status: "success",
        duration: 1500,
        isClosable: true,
        marginTop: "2rem",
      });
    } else {
      toast({
        title: data.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
    onClose1()
  }
  async function fundClick(cid) {
    // let message;
    console.log(cid)
    let resp = await fetch(fundUrl + cid, {
      method: 'POST',
      headers: {
        'auth-token': sessionStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        "amount": fund,
        "duration": duration,
        "organisation_name": organisation
      })
    }).then((response) => {
      response.json().then((json) => {
        // setData(json.data)
        console.log(json)
        // message = json.message
        if (json.success) {
          toast({
            title: json.message,
            status: "success",
            duration: 1500,
            isClosable: true,
            marginTop: "2rem",
          });
        }
        else {
          toast({
            title: json.message,
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        }
      })
    }).catch(error => {
      console.log(error)
    })
    // console.log(resp)
  }
  const sendToExpert = async (cid) => {

    await fetch(expertUrl + cid, {
      method: 'POST',
      headers: {
        'auth-token': sessionStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => {
      response.json().then((json) => {
        // setData(json.data)
        console.log(json)
        // message = json.message
        if (json.success) {
          toast({
            title: json.message,
            status: "success",
            duration: 1500,
            isClosable: true,
            marginTop: "2rem",
          });
        }
        else {
          toast({
            title: json.message,
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        }
      })
    }).catch(error => {
      console.log(error)
    })
  }

  const evaluatorScores = async (cid) => {

    await fetch(evaluatorUrl + cid, {
      method: 'GET',
      headers: {
        'auth-token': sessionStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => {
      response.json().then((json) => {
        // setData(json.data)
        console.log(json)
        // message = json.message
        if (json.success) {
          toast({
            title: json.message,
            status: "success",
            duration: 1500,
            isClosable: true,
            marginTop: "2rem",
          });
          onOpen2()
          setEvaluatorScores(json.data)
        }
        else {
          toast({
            title: json.message,
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        }
      })
    }).catch(error => {
      console.log(error)
    })

  }

  return (
    <>
      <VStack align="center" justify="center">
        <Text fontSize="2xl" fontWeight="bold" m={2}>
          All Submitted Proposal
        </Text>
        <TableContainer>
          <Table variant='striped' colorScheme='teal' p={20} size='md'>
            <TableCaption>Research Proposal Ended</TableCaption>
            <Thead>
              <Tr>
                <Th>Cid</Th>
                <Th>Title</Th>
                <Th>Options</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data && data.map((item) => (
                <Tr key={item.cid}>
                  <Th>{item.cid}</Th>
                  <Th>{item.title.slice(0, 60)}...</Th>
                  <Th>
                    <HStack>
                      <Button padding='5' onClick={() => { navigate("/dashboard/admin/view/" + item.cid) }}>
                        Open
                      </Button>
                      {item.verified &&
                        <>
                          <Button padding='5' onClick={onOpen}>
                            Fund
                          </Button>
                          <Modal
                            initialFocusRef={initialRef}
                            finalFocusRef={finalRef}
                            isOpen={isOpen}
                            onClose={onClose}
                          >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Funding</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={6}>
                                <FormControl>
                                  <FormLabel>Amount</FormLabel>
                                  <Input placeholder='In Rs.' id={fund} name={fund} value={fund} onChange={(e) => { setFund(e.target.value) }} />
                                </FormControl>

                                <FormControl mt={4}>
                                  <FormLabel> Duration</FormLabel>
                                  <Input placeholder='In months' id={duration} name={duration} value={duration} onChange={(e) => { setDuration(e.target.value) }} />
                                </FormControl>
                                <FormControl mt={4}>
                                  <FormLabel> Organisation Name</FormLabel>
                                  <Input placeholder='Like UGC, AICTE etc.' id={organisation} name={organisation} value={organisation} onChange={(e) => { setOrganisation(e.target.value) }} />
                                </FormControl>
                              </ModalBody>

                              <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={() => { fundClick(item.cid) }}>
                                  Submit
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          <Button padding='5' onClick={onOpen1}>
                            Reject
                          </Button>
                          <AlertDialog
                            isOpen={isOpen1}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose1}
                            isCentered
                          >
                            <AlertDialogOverlay>
                              <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                  Reject Proposal
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                  Are you sure? You can't undo this action afterwards.
                                  <FormControl mt={4}>
                                    <FormLabel> Reason</FormLabel>
                                    <Input placeholder='Enter reason for rejection here...' id={reason} name={reason} value={reason} onChange={(e) => { setReason(e.target.value) }} />
                                  </FormControl>
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                  <Button ref={cancelRef} onClick={onClose1}>
                                    Cancel
                                  </Button>
                                  <Button colorScheme='red' ml={3} onClick={async () => { rejectProposal(item.cid); window.reload(); }}>
                                    Delete
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialogOverlay>
                          </AlertDialog>
                          <Button padding='5' onClick={() => evaluatorScores(item.cid)}>
                            View Evaluators Scores
                          </Button>
                          {/* WORKING HERE */}
                          <Modal isOpen={isOpen2} onClose={onClose2}>
                            <ModalOverlay />
                            <ModalContent  w="100vw" h="fit">
                              <ModalHeader>Evaluator Result</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <TableContainer  w="100vw" >
                                  <Table variant='simple' >
                                  
                                    <Thead>
                                      <Tr>
                                        <Th>Expert Name</Th>
                                        <Th>Score 1</Th>
                                        <Th>Score 2</Th>
                                        <Th>Score 3</Th>
                                        <Th>Comments</Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {evaluator && evaluator.map((item) => {
                                        return (
                                          <Tr>
                                            <Td>{item.expert_name}</Td>
                                            <Td>{item.score1}</Td>
                                            <Td >{item.score2}</Td>
                                            <Td >{item.score3}</Td>
                                            <Td >{item.comments}</Td>
                                          </Tr>
                                        )
                                      })
                                      }
                                    </Tbody>
                                  </Table>
                                </TableContainer>

                              </ModalBody>
                              <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose2}>
                                  Close
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </>
                      }
                      {
                        !item.verified &&
                        <>
                          <Button ml={3} onClick={() => sendToExpert(item.cid)}>
                            Send To Expert
                          </Button>
                        </>
                      }
                    </HStack>
                  </Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

    </>
  )
}


export default SubmittedProposals