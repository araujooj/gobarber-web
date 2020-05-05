import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Logo from "../../assets/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import getValidationErrors from "../../utils/getValidationErrors";
import { Background, Container, Content } from "./styles";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail é obrigatório")
          .email("Digite um email válido"),
        password: Yup.string().min(6, "Digite no minimo 6 digitos"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="Gobarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1> Faça seu cadastro</h1>
          <Input
            name="name"
            icon={FiUser}
            type="name"
            placeholder="Nome"
          ></Input>
          <Input name="email" icon={FiMail} placeholder="E-mail"></Input>
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          ></Input>
          <Button type="submit"> Cadastrar </Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
