import React, { Component } from 'react'

export class MainPage extends Component {
    render() {
        return (
            <div>
                <h3 className="mb-5 mt-2">Üdvözlünk a HRManager oldalon!</h3>
                <h5>Az oldal leírása:</h5>
                <div className="row">
                    <div className="col-6 border-bottom ml-3 mb-2 p-2">
                        <p>
                            Szakdolgozatom témájaként választottam egy emberi erőforrásokat kezelő és menedzselő webalkalmazás elkészítését.<br></br>
                            A weboldal működésének lényege, hogy a felhasználók beléptetésén és kiléptetésén kívül kezelni tudja
                            a különféle HR-es feladatokat.<br></br>
                            Ezek közé tartozik például a szabadságok kezelése a munkáltató és alkalmazottak körében egyaránt.
                        </p>
                    </div>                   
                </div>
                <div className="row mb-5 mt-3">
                    <div className="col-6">
                    <h5>Funkciók:</h5>
                        <ol class="list-group list-group">
                            <li className="list-group-item">Felhasználók felvétele, módosítása, törlése.</li>
                            <li className="list-group-item">Felhasználókhoz jogosultságok rendelése.</li>
                            <li className="list-group-item">Felhasználók authentikálása, jogosultság alapú renderelés.</li>
                            <li className="list-group-item">Szabadságok igénylése.</li>
                            <li className="list-group-item">Összes, felhasznált és kivehető szabadságok megjelenítése felhasználónként.</li>
                            <li className="list-group-item">Osztályvezető jogkörtől kezdődően az osztályukhoz tartozó alkalmazottak szabadságainak kezelése.</li>
                            <li className="list-group-item">Kötelező szabadságok kiadása osztályvezetői szinttől.</li>
                        </ol>
                    </div>
                </div>                
            </div>
        )
    }
}

export default MainPage
