import React, { useState } from "react";
import {
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperSignInContainer,
    WrapperSignInPage,
    WrapperTextLight,
} from "./style";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import LogoSignIn from "../../assets/images/logo-signIn.png";
import { Image } from "antd";
import { useNavigate } from "react-router";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";

const SignInPage = () => {
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Call API
    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const { data, isPending } = mutation;

    const handleNavigateSignup = () => {
        navigate("/sign-up");
    };

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value) => {
        setPassword(value);
    };

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password,
        });
    };

    return (
        <WrapperSignInPage>
            <WrapperSignInContainer>
                <WrapperContainerLeft>
                    <h1>Hello, 👋</h1>
                    <p>Sign In or Sign Up</p>
                    <InputForm
                        placeholder="abc@email.com"
                        style={{ marginBottom: "15px" }}
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    <div style={{ position: "relative" }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: "10",
                                position: "absolute",
                                top: "6px",
                                right: "8px",
                            }}
                        >
                            {isShowPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )}
                        </span>
                        <InputForm
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={handleOnChangePassword}
                        />
                    </div>
                    {data?.status === "ERR" && (
                        <span style={{ color: "red" }}>{data?.message}</span>
                    )}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                color: "#fff",
                                fontSize: "1.8rem",
                                fontWeight: "600",
                                background: "#FF3945",
                                height: "45px",
                                width: "100%",
                                border: "none",
                                borderRadius: "4px",
                                margin: "26px 0 10px",
                            }}
                            textButton={"Sign In"}
                        />
                    </Loading>
                    <p>
                        <WrapperTextLight>Forgot password?</WrapperTextLight>
                    </p>
                    <p>
                        No account?{" "}
                        <WrapperTextLight onClick={handleNavigateSignup}>
                            Create your account
                        </WrapperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image
                        src={LogoSignIn}
                        preview={false}
                        alt="logo-signIn"
                        style={{ width: "203px", height: "203px" }}
                    />
                    <h4
                        style={{
                            marginBottom: "10px",
                            color: "#0b74e5",
                            fontSize: "1.7rem",
                        }}
                    >
                        Buying at TechShop
                    </h4>
                    <p style={{ margin: 0, color: "#0b74e5" }}>
                        Quality commitment
                    </p>
                </WrapperContainerRight>
            </WrapperSignInContainer>
        </WrapperSignInPage>
    );
};

export default SignInPage;
