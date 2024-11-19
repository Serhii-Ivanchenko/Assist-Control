import DatePicker from "react-datepicker"
import css from "./AddStaffMemberModal.module.css"
import { Field, Form, Formik } from "formik"
import { BsTrash } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { BsReceipt } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";




export default function AddStaffMemberModal() {
    return (
        <div className={css.modal}>
            <Formik>
                <Form>
                    <div className={css.mainInfo}>

                        <div className={css.column}>
                        <div className={css.iputBox}>                          
                    <label className={css.label}>ПІБ</label>
                    <Field name="name" className={css.inputFirst} />
                </div>
                

                        <div className={css.iputBox}>                         
                    <label className={css.label}>Телефон</label>
                    <Field name="phone" className={css.inputFirst} />
                        </div>
                        

                        <div className={css.iputBox}>
                    <label className={css.label}>Місце проживання</label>
                    <Field name="address" className={css.inputFirst} />
                </div>
                
                        </div>
                        
                        <div className={css.column}>

                          <div className={css.iputBox}>  
                         <label className={css.label}>Дата народження</label>
                                <DatePicker
                                    className={css.inputSecond}
                            name="birthday"
                    dateFormat="dd.mm.yyyy"
                                />
                            </div>
                            
                        <div className={css.iputBox}>
                    <label className={css.label}>Посада</label>
                                <Field as="select" name="position" className={css.inputSecond}>
                                    <option value="m">Механік</option>
                                    <option value="c">Кухар</option>
                                    <option value="w">Працівник</option>
                                </Field>
                            </div>
                            
                            <div className={css.iputBox}>
                    <label className={css.label}>Ролі</label>
                                <Field as="select" name="role" className={css.inputSecond}>
                                    <option value="adm">Адміністратор</option>
                                    <option value="person">Хтось ще)</option>
                                    <option value="person1">Соррі, я забула які ще є)</option>
                                </Field>
                            </div>
                        </div>
                        
                        <div className={`${css.column} ${css.columnThree}`}>

                             <div className={css.iputBox}>                         
                    <label className={css.label}>E-mail</label>
                    <Field name="email" className={css.inputThird} />
                            </div>
                            
                            <div className={css.iputBoxLP}>
                                <Field name="login" className={css.inputLP } />                               
                                <Field name="password" className={css.inputLP} />
                            </div>

                            <div className={css.btnAndLabel}>
                                <p className={css.label}>Логін та пароль</p>

                                <div className={css.buttons}>
                                <button type="button" className={css.create}>Згенерувати</button>
                                <button type="button" className={css.delete}> <BsTrash size={18}/> </button>
                                </div>
                            </div>

                        </div>
                    </div>


                    
                    <div className={css.documents}>
                        <div className={css.docColumn}>
                            <div className={css.docBox}>
                                <label className={`${css.docLabel} ${css.docLabelForPhoto}`}> <BsFillCloudUploadFill className={css.icon} /> Паспорт</label>
                                <Field type="file" name="passport" className={css.docInput} />
                                <img src="" alt="doc" className={css.docImage} />
                                <img src="" alt="doc" className={css.docImage } />
                            </div>

                            <div className={`${css.docBox} ${css.docBoxID}`}>                               
                                <label className={`${css.docLabel} ${css.docLabelForPhoto}`}> <BsFillCloudUploadFill className={css.icon}/> ІПН</label>
                                <Field type="file" name="ID" className={css.docInput} />

                                <img src="" alt="doc" className={css.docImage } />
                                <img src="" alt="doc" className={css.docImage} />
                                
                            </div>
                        </div>

                        <div className={css.docColumn}>

                        <div className={css.docBox}>
                                <label className={`${css.docLabel} ${css.docLabelForPhoto}`}> <BsFillCloudUploadFill className={css.icon}/> Диплом</label>
                                <Field type="file" name="diploma" className={css.docInput} />
                                <img src="" alt="doc" className={css.docImage } />
                                <img src="" alt="doc" className={css.docImage } />
                            </div>

                            <div className={css.docBox}>                               
                                <label className={`${css.docLabel} ${css.docLabelForPhoto}`}> <BsFillCloudUploadFill className={css.icon}/>Трудова</label>
                                <Field type="file" name="laborBook" className={css.docInput} />
                                <img src="" alt="doc" className={css.docImage } />
                                
                        </div>
                        
                        <div className={css.docBox}>                               
                                <label className={`${css.docLabel} ${css.docLabelForPhoto}`}> <BsFillCloudUploadFill className={css.icon}/>Резюме</label>
                                <Field type="file" name="CV" className={css.docInput} />
                                <img src="" alt="doc" className={css.docImage } />
                                
                            </div>
                       </div>

                    <div className={css.docColumn}>
                            <div className={css.docBox}>
                            <label className={css.docLabel}>
                                <BsReceipt className={css.icon}/>
                                Договір підряда
                                <BsThreeDotsVertical className={css.icon}/>
                            </label>
                            
                                <Field type="file" name="contract" className={css.docInput} />
                            </div>

                            <div className={css.docBox}>                               
                            <label className={css.docLabel}>
                                <BsReceipt className={css.icon}/>
                                Договір про найм
                                <BsThreeDotsVertical className={css.icon}/>
                            </label>
                            
                                <Field type="file" name="employment" className={css.docInput}/>
                        </div>
                        
                        <div className={css.docBox}>                               
                            <label className={css.docLabel}>
                                <BsReceipt className={css.icon}/>
                                Договір МВ
                                <BsThreeDotsVertical className={css.icon}/>
                            </label>
                                <Field type="file" name="agreement" className={css.docInput}/>
                            </div>
                        </div>

 </div>


            <div>
                <button type="button">Закрити</button>
                <button type="submit">Зберегти</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}