import { Button, ColumnBox, Container, FormBox, Header, RowBox, Text, Title, Input, Select } from "../../theme";
import imgLogin from "../../img/imgLogin.svg";
import logo from "../../img/logo.svg";
import { useHistory } from "react-router-dom";
import { container, rightSide } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRegister } from "../../providers/Register";
import { toast } from "react-toastify";
export const Register = () => {
    const history = useHistory();
    const schema = yup.object().shape({
        email: yup.string().email("Email inválido").required("Campo Obrigatório"),
        nome: yup.string().required("Campo Obrigatório"),
        data_nascimento: yup.string().required("Campo Obrigatório"),
        celular: yup.string().required("Campo Obrigatório"),
        profissao: yup.string().required("Campo Obrigatório"),
        status_fumante: yup.string().required("Campo Obrigatório"),
        cpf: yup.string().required("Campo Obrigatório").min(11, "Mínimo de 11 dígitos").max(11, "Máximo de 11 dígitos"),
        crm: yup.string().required("Campo Obrigatório").min(6, "Mínimo de 6 dígitos"),
        password: yup
            .string()
            .required("Campo Obrigatório")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Mínimo 8 digitos, Necessário maiúscula, minúscula, Número e Caracter especial"),
        confirmarSenha: yup
            .string()
            .oneOf([yup.ref("password"), null], "As senhas não coincidem")
            .required("Campo Obrigatório"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    const { cadastrarUsuario } = useRegister();
    const novoUsuario = (registros) => {
        console.log("registros", registros);
        let validacao = cadastrarUsuario(registros);
        if (validacao.status) {
            toast.success(validacao.message);
            history.push("/login");
        } else {
            toast.error(validacao.message);
        }
    };
    const options_fumante = [
        { value: "", desc: "Escolha", default: true },
        { value: "1", desc: "Sim" },
        { value: "0", desc: "Não" },
    ];
    return (
        <Container style={container}>
            <ColumnBox width="600px" height="100%">
                <Header height="70px">
                    <img src={logo} alt="" />
                </Header>
                <ColumnBox height="60%">
                    <Title>Registre-se</Title>
                    <Text>É rápido e fácil</Text>
                    <FormBox height="100%" onSubmit={handleSubmit(novoUsuario)}>
                        <ColumnBox height="100%" overflow="auto">
                            <ColumnBox>
                                <Input register={register} name="email" errorMsg={errors.email?.message} label="Email" placeholder="Seu Email" type="email" />
                                <Input register={register} name="nome" errorMsg={errors.nome?.message} label="Nome" placeholder="Seu Nome" />
                            </ColumnBox>
                            <RowBox>
                                <Input register={register} name="data_nascimento" errorMsg={errors.data_nascimento?.message} label="Nascimento" type="date" />
                                <Input register={register} name="celular" errorMsg={errors.celular?.message} label="Celular" placeholder="Seu Número" type="tel" maks="(99) 99999.9999" pattern="[0-9]{2}[0-9]{9}" />
                            </RowBox>
                            <RowBox>
                                <Input register={register} name="profissao" errorMsg={errors.profissao?.message} label="Profissão" placeholder="Sua Profissão" type="text" />
                                <Select register={register} name="status_fumante" errorMsg={errors.status_fumante?.message} label="Fumante" options={options_fumante} />
                            </RowBox>
                            <RowBox>
                                <Input register={register} name="cpf" errorMsg={errors.cpf?.message} label="CPF" placeholder="Insira seu CPF" type="number" />
                                <Input register={register} name="crm" errorMsg={errors.crm?.message} label="CRM" placeholder="Insira seu CRM" type="number" />
                            </RowBox>
                            <RowBox>
                                <Input register={register} name="password" errorMsg={errors.password?.message} label="Senha" placeholder="Sua Senha" type="passWord" />
                                <Input register={register} name="confirmarSenha" errorMsg={errors.confirmarSenha?.message} label="Confirmar Senha" placeholder="Insira a mesma senha" type="passWord" />
                            </RowBox>
                        </ColumnBox>
                        <RowBox>
                            <Button width="100%" type="submit">
                                Registre-se
                            </Button>
                            <Button width="100%" onClick={() => history.push("/")}>
                                Voltar
                            </Button>
                        </RowBox>
                    </FormBox>
                </ColumnBox>
            </ColumnBox>
            <ColumnBox style={rightSide}>
                <img src={imgLogin} alt="" />
            </ColumnBox>
        </Container>
    );
};
