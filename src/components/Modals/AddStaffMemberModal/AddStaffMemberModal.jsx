import DatePicker from "react-datepicker"
import css from "./AddStaffMemberModal.module.css"
import { Field, Form, Formik } from "formik"
import { BsTrash } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { BsReceipt } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsCalendar2Week } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsKeyFill } from "react-icons/bs";






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
                                <div className={css.phoneLine}>
                    <Field name="phone" className={`${css.inputFirst} ${css.inputPhone}`} />
                                <button type="button" className={css.phoneUpload}><BsFillCloudUploadFill size={30}/></button> 
                                    <img src="" alt="" className={css.phoneImg } />
                                </div>
                        </div>
                        

                        <div className={css.iputBox}>
                    <label className={css.label}>Місце проживання</label>
                    <Field name="address" className={css.inputFirst} />
                </div>
                
                        </div>
                        
                        <div className={css.column}>

                          <div className={css.iputBox}>  
                                <label className={css.label}>Дата народження</label>
                                <div className={css.calendarBox}>
                                <DatePicker
                                    id=""
                                    className={`${css.inputSecond} ${css.calendar}`}
                                    name="birthday"
                                    dateFormat="dd.mm.yyyy"
                                    selected=""
                                    onChange=""
                                />

                                    <BsCalendar2Week size={24} className={css.calendarIcon} />
                              </div>

                            </div>
                            
                        <div className={css.iputBox}>
                                <label className={css.label}>Посада</label>
                                <div className={css.inputAndArrow}>
                                <Field as="select" name="position" className={css.inputSecond}>
                                    <option value="m">Механік</option>
                                    <option value="c">Кухар</option>
                                    <option value="w">Працівник</option>
                                    </Field>
                                    <BsFillCaretDownFill className={css.iconArrowRight } />
                                </div>

                            </div>
                            
                            <div className={css.iputBox}>
                                <label className={css.label}>Ролі</label>
                                <div className={css.inputAndArrow}>
                                
                                <Field as="select" name="role" className={css.inputSecond}>
                                    <option value="adm">Адміністратор</option>
                                    <option value="person">Хтось ще)</option>
                                    <option value="person1">Соррі, я забула які ще є)</option>
                                </Field>
                                <BsFillCaretDownFill className={css.iconArrowRight } />
</div>
                            </div>
                        </div>
                        
                        <div className={`${css.column} ${css.columnThree}`}>

                             <div className={css.iputBox}>                         
                    <label className={css.label}>E-mail</label>
                    <Field name="email" className={css.inputThird} />
                            </div>
                            
                            <div className={css.iputBoxLP}>
                                <div className={css.lpIconBox}>
                                    <Field name="login" className={css.inputLP} />
                                    <BsFillPersonFill size={16} className={css.lpIcon } />
                                </div>    
                                
                                <div className={css.lpIconBox}>
                                    <Field name="password" className={css.inputLP} />
                                    <BsKeyFill size={16} className={css.lpIcon } />

                                    </div>
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
                    
                    <div className={css.salary}>
                        <div className={css.calculation}>
                        <div className={css.leftPart}>
                        <div className={css.rateDiv}>
                                    <p className={css.rate}>Ставка</p>
                                    <div className={css.inputAndArrow}>
                            <Field as="select" name="period" className={css.periodInput}>
                                <option value="day">День</option>
                                <option value="week">Тиждень</option>                             
                                <option value="month">Місяць</option>
                                <option value="year">Рік</option>                              
                                    </Field>
                                        <BsFillCaretDownFill className={css.arrowIcon} size={10}/>
                                    </div>
                        </div>
                            <Field name="rate" className={css.rateInput } value="15000" placeholder="15000" />
                        <div className={css.minRateDiv}>
                            <Field name="minRate" className={css.minRateInput }/>
                            <p className={css.text}>Мінімальна</p>
                            </div>
                        </div>

                        <p className={css.plus}>+</p>

                        <div className={css.rightPart}>
                            <p className={css.percent}>%</p>

                            <ul className={css.inputsList}>
                                <li className={css.listItem}>
                                    <Field name="" className={css.salaryInput} />
                                    <div className={css.salaryLabel}>
                                    <p className={css.salaryTitle}>СР</p>
                                        <p className={`${css.salaryText} ${css.salaryTextAmount}`}>Сума робіт</p>
                                    </div>
                                </li >

                                <li className={css.listItem}>
                                    <Field name="" className={css.salaryInput} />
                                    <div className={css.salaryLabel}>
                                    <p className={css.salaryTitle}>СЗ</p>
                                        <p  className={css.salaryText}>Сума запчастин</p>
                                    </div>
                                </li>

                                <li className={css.listItem}>
                                    <Field name="" className={css.salaryInput }/>
                                    <div className={css.salaryLabel}>
                                    <p className={css.salaryTitle}>НЗ</p>
                                        <p  className={css.salaryText}>Націнка запчастини</p>
                                    </div>
                                </li>

                                <li className={css.listItem}>
                                    <Field name="" className={css.salaryInput }/>
                                    <div className={css.salaryLabel}>
                                    <p className={css.salaryTitle}>ЧП</p>
                                        <p  className={css.salaryText}>Чистого прибутку</p>
                                    </div>
                                </li>
                            </ul>


                            </div>
                        </div>

                        <p className={css.salaryRules}>Правила начислення зарплатні</p>

                    </div>

                    <div className={css.schedule}>
                        <p>Графік</p>

                        {/* <div>
                            <label>Графік роботи
                            <Field type="checkbox" name="schedule" className={css.checkbox} />
                            <span className={css.checkboxSpan}><BsCheckLg className={css.cbIcon} /></span>
                            </label>
                        </div> */}

                    </div>


            <div className={css.btnBox}>
                <button type="button" className={css.close}>Закрити</button>
                <button type="submit" className={css.save}><BsCheckLg size={18}/> Зберегти</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}