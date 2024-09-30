import { Field, Form, Formik } from "formik";

export default function UserSettingsModal() {
    return (
        <Formik initialValues={{}} onSubmit={() => {}}>
            <Form>
                <Field type='file' name='photo' />
                <Field type='text' name='username' />
                <Field type='email' name='email' />
                <Field type='' name='phone' />
                <Field type='text' name='company' />
                <button type="submit">Зберегти</button>
            </Form>
        </Formik>
    )
}