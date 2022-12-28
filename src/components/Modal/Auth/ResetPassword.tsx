import React, { useState } from "react";
import { Button, Flex, Icon, Input, Text, Image } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot, BsReddit } from "react-icons/bs";
import { authModalState, ModalView } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";

type ResetPasswordProps = {
  
};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };
  return (
    <Flex direction="column" alignItems="center" width="100%">
      {/* <Icon as={BsReddit} color="brand.100" fontSize={40} mb={2} /> */}
      <Image alt="image" src="/images/logo.png" height="200px"/>
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={4}>Check your email :)</Text>
      ) : (
        <>
          <Text fontSize="sm" textAlign="center" mb={2}>
            Enter the email associated with your account and we will send you a
            reset link
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <Input
              required
              name="email"
              placeholder="email"
              type="email"
              mt={2}
              mb={2}
              border="none"
              outline="none"
              boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
              onChange={(event) => setEmail(event.target.value)}
              fontSize="10pt"
              _placeholder={{ color: "#5596E6" }}
              bg="none"
              
            />
            <Text textAlign="center" fontSize="10pt" color="red">
              {error?.message}
            </Text>
            <Button
              width="100%"
              height="36px"
              mb={4}
              mt={2}
              type="submit"
              isLoading={sending}
              bg="none"
              boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
              _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color="blue.500"
        fontWeight={700}
        cursor="pointer"
      >
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOGIN
        </Text>
        <Icon as={BsDot} />
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;