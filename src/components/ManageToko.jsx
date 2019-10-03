import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux'
import { ubahUser } from '../redux/actions'
import 'bootstrap/dist/css/bootstrap.css';


class ManageToko extends Component {

    state = {
        listToko: [],
        listKota: [],
        listImgToko: [],
        inputNamaAdd: '',
        inputAlamatAdd: '',
        inputKotaAdd: 0,
        inputIncomeAdd: 0,
        inputTanggalAdd: moment().format("YYYY-MM-DD"),
        selectedEditId: 0,
        editNama: '',
        editAlamat: '',
        editKota: 0,
        editIncome: 0,
        editTanggal: moment().format("YYYY-MM-DD"),
        selectedToko: { id: 0, nama: '' },
        imagesTokoAdd: null,
        imageTokoEdit: null,
        selectedImgId: 0
     }

    componentDidMount() {
        this.props.ubahUser('Batman Ngantuk')
        this.getData()
    }

    getData = () => {
        axios.get('http://localhost:1997/toko')
            .then((res) => {
                console.log(res.data)
                this.setState({ listToko: res.data })

                axios.get('http://localhost:1997/kota')
                    .then((res) => {
                        this.setState({ listKota: res.data })
                    })
                    .catch((err) => {
                        console.log(err.response)
                    })
            }).catch((err) => {
                console.log(err.response)
            })
    }


    // INPUT TOKO
    inputNamaChange = (e) => {
        this.setState({ inputNamaAdd: e.target.value })
    }

    inputAlamatChange = (e) => {
        this.setState({ inputAlamatAdd: e.target.value })
    }

    inputKotaChange = (e) => {
        this.setState({ inputKotaAdd: Number(e.target.value) })
    }

    inputIncomeChange = (e) => {
        this.setState({ inputIncomeAdd: Number(e.target.value) })
    }

    inputTanggalChange = (e) => {
        this.setState({ inputTanggalAdd: e.target.value })
    }
    // INPUT TOKO


    // EDIT TOKO
    onEdit = (item) => {
        this.setState({
            selectedEditId: item.idToko,
            editNama: item.namaToko,
            editAlamat: item.alamat,
            editKota: item.idKota,
            editIncome: item.totalIncome,
            editTanggal: moment(item.tanggalBerdiri).format("YYYY-MM-DD")
        })
    }
    // EDIT TOKO


    // RENDERS
    renderListToko = () => {
        return this.state.listToko.map((item) => {
            if (item.idToko !== this.state.selectedEditId) { 
                return (
                    <tr key={item.idToko}>
                    <th scope="row">{item.idToko}</th>
                    <td>{item.namaToko}</td>
                    <td>{item.alamat}</td>
                    <td>{item.Kota}</td>
                    <td>{item.totalIncome}</td>
                    <td>{moment(item.tanggalBerdiri).format('YYYY-MM-DD')}</td>
                    <td>
                        <input className="btn btn-info rounded-pill" type="button" value='SELECT'
                                onClick={() => { this.setState({ selectedToko: item }); this.selectTokoImg(item.idToko) } }
                        />
                        <input className="btn btn-primary rounded-pill my-2 ml-1 d-inline" type="button" value="EDIT" onClick={() => this.onEdit(item)} />
                        <input className="btn btn-danger rounded-pill d-inline" type="button" value="DELETE" onClick={() => this.btnDeleteClick(item.idToko)} />
                    </td>
                </tr>
                )
            }

            return (
                <tr key={item.idToko}>
                    <th scope="row">{item.idToko}</th>
                    <td><input className='form-control' type="text" value={this.state.editNama} onChange={(e) => this.setState({ editNama: e.target.value })} /></td>
                    <td><textarea className='form-control' rows="2" value={this.state.editAlamat} onChange={(e) => this.setState({ editAlamat: e.target.value })} /></td>
                    <td>
                        <select className="custom-select" id="listKota"
                                value={this.state.editKota}
                                onChange={(e) => this.setState({ editKota: e.target.value })}>
                            {this.renderListKota()}
                        </select>
                    </td>
                    <td>
                        <input className='form-control' type="number" step="1000"
                            value={this.state.editIncome}
                            onChange={(e) => this.setState({ editIncome: Number(e.target.value) })}
                        />
                    </td>
                    <td>
                        <input className='form-control' type="date"
                            value={this.state.editTanggal}
                            onChange={(e) => this.setState({ editTanggal: e.target.value })}
                        />
                    </td>
                    <td>
                        <input className="btn btn-secondary rounded-pill" type="button" value="Cancel" onClick={() => this.setState({ selectedEditId: 0 })} />
                        <input className="btn btn-primary rounded-pill ml-1" type="button" value="Save" onClick={() => this.btnEditClick(item.idToko)} />
                    </td>
                </tr>
            )
        })
    }

    renderListKota = () => {
        return this.state.listKota.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.nama}</option>
            )
        })
    }

    renderImgToko = () => {
        return this.state.listImgToko.map((item) => {
            if (item.id !== this.state.selectedImgId) {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.pathname}</td>
                        <td>
                            <img src={`http://localhost:1997${item.pathname}`} width='100px' alt="img toko"/>
                        </td>
                        <td>{item.namaToko}</td>
                        <td>
                            <input className='btn btn-primary mr-1 my-1' type="button" value="EDIT" onClick={() => this.setState({ selectedImgId: item.id })} />
                            <input className='btn btn-danger my-1' type="button" value="DELETE" onClick={() => this.btnDelImg(item.id, item.pathname, item.tokoId)} />
                        </td>
                    </tr>
                )
            }

            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.pathname}</td>
                    <td>
                        <img src={`http://localhost:1997${item.pathname}`} width='100px' alt="img toko" /><br/>
                        <input className='mt-3' type="file" accept=".jpg, .png, .jpeg, .gif" onChange={this.imageTokoEditChange} />
                    </td>
                    <td>{item.namaToko}</td>
                    <td>
                        <input className='btn btn-secondary mr-1 my-1' type="button" value="CANCEL" onClick={() => this.setState({ selectedImgId: 0 })} />
                        <input className='btn btn-primary my-1' type="button" value="SAVE" onClick={() => this.btnSaveImg(item.id)} />
                    </td>
                </tr>
            )
        })
    }
    // RENDERS


    // TOKO BUTTONS
    btnAddClick = () => {
        axios.post('http://localhost:1997/addtoko', {
            nama: this.state.inputNamaAdd,
            alamat: this.state.inputAlamatAdd,
            kotaId: this.state.inputKotaAdd,
            totalIncome: this.state.inputIncomeAdd,
            tanggalBerdiri: this.state.inputTanggalAdd
        }).then((res) => {
            console.log(res.data)
            this.getData()
        }).catch((err) => {
            console.log(err.response)
        })
    }

    btnEditClick = (idBro) => {
        axios.put('http://localhost:1997/edittoko/' + idBro, {
            nama: this.state.editNama,
            alamat: this.state.editAlamat,
            kotaId: this.state.editKota,
            totalIncome: this.state.editIncome,
            tanggalBerdiri: this.state.editTanggal
        }).then((res) => {
            console.log(res.data)
            this.setState({ selectedEditId: 0 })
            this.getData()
        }).catch((err) => {
            console.log(err.response)
        })
    }

    btnDeleteClick = (id) => {
        if (window.confirm('Are u Sure ?')) {
            axios.delete('http://localhost:1997/deletetoko/' + id)
                .then((res) => {
                    console.log(res.data)
                    this.getData()
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
    }
    // TOKO BUTTONS


    // IMAGES
    selectTokoImg = (idToko) => {
        axios.get('http://localhost:1997/tokoimg/' + idToko)
            .then(res => {
                this.setState({ listImgToko: res.data })
                console.log(this.state.listImgToko)
            })
            .catch(err => {
                console.log(err)
            })
    }

    btnAddImage = () => {
        if (this.state.imagesTokoAdd) {
            var formdata =  new FormData()

            var options = {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            }

            var data = {
                tokoId: this.state.selectedToko.idToko,
                namaToko: this.state.selectedToko.namaToko
            }

            for (let i = 0; i < this.state.imagesTokoAdd.length; i++) {
                formdata.append('image', this.state.imagesTokoAdd[i])
            }
            formdata.append('data', JSON.stringify(data))

            axios.post('http://localhost:1997/addtokoimg', formdata, options)
                .then( res => {
                    console.log(res.data)
                    this.setState({ imagesTokoAdd: null })
                    this.selectTokoImg(this.state.selectedToko.idToko)
                })
                .catch( err => {
                    console.log(err.response)
                })
        } else {
            alert('Mohon cek lagi, mungkin belum pilih gambar atau belum pilih toko.')
        }
    }

    btnSaveImg = (id) => {
        if (this.state.imageTokoEdit) {
            var formdata = new FormData()

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            formdata.append('image', this.state.imageTokoEdit[0])

            axios.put('http://localhost:1997/editimg/' + id, formdata, options)
                .then(res => {
                    console.log(res.data)
                    this.setState({ imageTokoEdit: null, selectedImgId: 0 })
                    this.selectTokoImg(this.state.selectedToko.idToko)
                })
                .catch(err => {
                    console.log(err.response)
                })
        } else {
            alert('Error Cuk')
        }
    }

    btnDelImg = (id, path, tokoId) => {
        if (window.confirm('Are u Sure ?')) {
            axios.post('http://localhost:1997/deleteimg', {
                id, path
            })
                .then((res) => {
                    console.log(res.data)
                    this.selectTokoImg(tokoId)
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
    }

    imageTokoAddChange = (e) => {
        console.log(e.target.files)
        if (e.target.files[0]) {
            this.setState({ imagesTokoAdd: e.target.files })
        } else {
            this.setState({ imagesTokoAdd: null })
        }
    }

    imageTokoEditChange = (e) => {
        console.log(e.target.files)
        if (e.target.files[0]) {
            this.setState({ imageTokoEdit: e.target.files })
        } else {
            this.setState({ imageTokoEdit: null })
        }
    }
    // IMAGES


    render() {
        console.log(this.props.username)
        return (
            <div className='px-5'>
                <center>
                    <h1 className='my-5'>Manage Toko ({this.props.username})</h1>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">Kota</th>
                                <th scope="col">Total Income</th>
                                <th scope="col">Tanggal Berdiri</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListToko()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <span style={{fontFamily:'Century Gothic'}}> ++ </span>
                                </td>
                                <td>
                                    <input className='form-control' type="text" maxLength="20"
                                            value={this.state.inputNamaAdd}
                                            onChange={this.inputNamaChange}
                                    />
                                </td>
                                <td>
                                    <textarea className='form-control' cols="30" rows="2"
                                            value={this.state.inputAlamatAdd}
                                            onChange={this.inputAlamatChange}
                                    />
                                </td>
                                <td>
                                    <select className="custom-select" id="listKota" onChange={this.inputKotaChange}>
                                        <option defaultChecked value={0}>-- Pilih Kota --</option>
                                        {this.renderListKota()}
                                    </select>
                                </td>
                                <td>
                                    <input className='form-control' type="number" step="1000"
                                            value={this.state.inputIncomeAdd}
                                            onChange={this.inputIncomeChange}
                                    />
                                </td>
                                <td>
                                    <input className='form-control' type="date"
                                            value={this.state.inputTanggalAdd}
                                            onChange={this.inputTanggalChange}
                                    />
                                </td>
                                <td>
                                    <input className="btn btn-success" type="button" value="ADD" onClick={this.btnAddClick} />
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    <h1 className='text-center mt-5'>Manage Image</h1>
                    <table className='mb-5'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Img Path</th>
                                <th>Image</th>
                                <th>Nama Toko</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderImgToko()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <input type="file" accept=".jpg, .png, .jpeg, .gif" multiple onChange={this.imageTokoAddChange} />
                                </td>
                                <td>
                                    {this.state.selectedToko.namaToko}
                                </td>
                                <td>
                                    <input type="reset" className='btn btn-success' value='ADD' onClick={this.btnAddImage} />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.user
    }
}

export default connect(mapStateToProps, {ubahUser})(ManageToko)