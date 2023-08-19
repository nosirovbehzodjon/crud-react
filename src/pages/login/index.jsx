import { SmileOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import context from "../../service/context";
import { useLogin } from "../../service/hooks";
const Login = ({ setProtected }) => {
    const navigate = useNavigate();
    const dataUser = useContext(context);
    console.log("context", dataUser);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: "Parol yoki Adminname xato!",
            description:
                "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            icon: (
                <SmileOutlined
                    style={{
                        color: "#108ee9",
                    }}
                />
            ),
        });
    };
    const { data, isLoading, mutateAsync, isError, error } = useLogin({
        key: ["login"],
        url: "/auth/login",
    });
    const onFinish = (values) => {
        console.log(values);
        mutateAsync(values, {
            onSuccess: (data) => {
                console.log("data----,", data);
                if (data?.token) {
                    navigate("/news");
                    localStorage.setItem("token", data.token);
                } else {
                    openNotification();
                }
            },
        });
    };
    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Adminname"
                    name="adminname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Login;
