import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("Login Success!");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        }
        else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend style={{ padding: "0px 5px" }}>Login</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: "email",
                                    message: "Email is not in correct format."
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Button
                                    loading={loading}
                                    onClick={() => form.submit()}
                                    type="primary">Login</Button>
                                <Link to='/'>Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>

                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Dont have an account?
                        <Link to='/register'> Register Here </Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    )
}
export default LoginPage;