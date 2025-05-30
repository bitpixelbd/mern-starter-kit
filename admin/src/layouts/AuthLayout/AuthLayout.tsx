import {FC, FormEvent, useState} from "react";
import {Form, Input, Button, Checkbox, Card, Typography, Alert, Space} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAuth from "~/hooks/useAuth";
import useTimeOutMessage from "~/hooks/useTimeOutMessage";
const { Title } = Typography;

interface Values {
    email: string;
    password: string;
    remember: boolean;
}

const AuthLayout: FC = () => {

    const [message, setMessage] = useTimeOutMessage()
    const [loading, setLoading] = useState(false)

    const { signIn } = useAuth()

    /*const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { email, password } = values
        setSubmitting(true)

        const result = await signIn({ email, password })

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }*/

    const onFinish = async (values: Values) => {
        const { email, password } = values
        setLoading(true)

        const result = await signIn({ email, password })

        if (result?.status === 'failed') {
            setMessage(result.message)
        }
        setLoading(false)
        /*console.log("Received values of form: ", values);
        if (values.remember) {
            localStorage.setItem("username", values.username);
            localStorage.setItem("password", values.password);
        }*/
    };

    const handleForgotPassword = (e: FormEvent) => {
        e.preventDefault();
        console.log("Handle password recovery logic here");
    };

    const handleRegister = (e: FormEvent) => {
        e.preventDefault();
        console.log("Handle registration logic here");
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card style={{ width: 500 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Title level={2}>Welcome</Title>
                    </div>
                    {message && (
                        <div style={{marginBottom: 10}}>
                            <Alert message={message} type="error" closable/>
                        </div>
                    )}
                </Space>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please enter your Email!" }]}
                    >
                        <Input
                            type={'email'}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please enter your Password!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                        {/*<a
                            style={{ float: "right" }}
                            className="login-form-forgot"
                            href=""
                            onClick={handleForgotPassword}
                        >
                            Forgot password
                        </a>*/}
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={loading}
                            disabled={loading}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                        >
                            Log in
                        </Button>
                        {/*Don't have an account{" "}
                        <a href="" onClick={handleRegister}>
                            sign up
                        </a>*/}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AuthLayout;
