import '../Styles/tree.css'

function App() {
  return (
    <div className="App">
      <h1>Tree Of Life</h1>

      <img src='/images/TOL.png' useMap="#image-map" alt="Tree of Life" />
      <map name="image-map">
        <area alt="Kether" title="Kether" href="tree/kether" coords="400,130,80" shape="circle" />
        <area alt="Chokmah" title="Chokmah" href="tree/chokmah" coords="669,284,80" shape="circle" />
        <area alt="Binah" title="Binah" href="tree/binah" coords="130,285,81" shape="circle" />
        <area alt="Chesed" title="Chesed" href="tree/chesed" coords="670,592,79" shape="circle" />
        <area alt="Geburah" title="Geburah" href="tree/geburah" coords="130,592,80" shape="circle" />
        <area alt="Tiphareth" title="Tiphareth" href="tree/tiphareth" coords="400,747,79" shape="circle" />
        <area alt="Netzach" title="Netzach" href="tree/netzach" coords="670,901,79" shape="circle" />
        <area alt="Hod" title="Hod" href="tree/hod" coords="130,901,79" shape="circle" />
        <area alt="Yesod" title="Yesod" href="tree/yesod" coords="399,1055,80" shape="circle" />
        <area alt="Malkuth" title="Malkuth" href="tree/malkuth" coords="400,1363,80" shape="circle" />
        <area alt="Aleph" title="Aleph" href="tree/aleph" coords="475,159,609,232,593,257,460,180" shape="poly" />
        <area alt="Bet" title="Bet" href="tree/bet" coords="322,158,334,184,209,257,191,232" shape="poly" />
        <area alt="Gimmel" title="Gimmel" href="tree/gimmel" coords="387,209,414,210,414,665,386,667" shape="poly" />
        <area alt="Daledh" title="Daledh" href="tree/daledh" coords="209,270,208,297,594,297,592,269" shape="poly" />
        <area alt="Heh" title="Heh" href="tree/heh" coords="619,343,644,357,452,687,426,671" shape="poly" />
        <area alt="Vav" title="Vav" href="tree/vav" coords="655,362,686,361,684,514,655,514" shape="poly" />
        <area alt="Zayin" title="Zayin" href="tree/zayin" coords="182,343,156,359,348,687,374,674" shape="poly" />
        <area alt="Chet" title="Chet" href="tree/chet" coords="145,361,116,361,116,515,145,515" shape="poly" />
        <area alt="Tet" title="Tet" href="tree/tet" coords="205,578,206,606,594,606,594,578" shape="poly" />
        <area alt="Yod" title="Yod" href="tree/yod" coords="597,617,611,642,473,719,458,696" shape="poly" />
        <area alt="Kaph" title="Kaph" href="tree/kaph" coords="686,668,656,668,657,825,684,824" shape="poly" />
        <area alt="Lamed" title="Lamed" href="tree/lamed" coords="204,618,189,643,328,721,341,697" shape="poly" />
        <area alt="Mem" title="Mem" href="tree/mem" coords="145,667,116,668,116,823,146,824" shape="poly" />
        <area alt="Nun" title="Nun" href="tree/nun" coords="473,771,460,794,597,873,611,849" shape="poly" />
        <area alt="Samekh" title="Samekh" href="tree/samekh" coords="415,822,386,822,387,978,414,976" shape="poly" />
        <area alt="Ayin" title="Ayin" href="tree/ayin" coords="342,797,327,772,190,850,203,877" shape="poly" />
        <area alt="Peh" title="Peh" href="tree/peh" coords="207,885,205,914,594,915,595,885" shape="poly" />
        <area alt="Tzadi" title="Tzadi" href="tree/tzadi" coords="596,925,611,949,474,1027,459,1003" shape="poly" />
        <area alt="Qof" title="Qof" href="tree/qof" coords="618,958,645,974,450,1304,426,1290" shape="poly" />
        <area alt="Resh" title="Resh" href="tree/resh" coords="203,926,189,950,327,1029,342,1004" shape="poly" />
        <area alt="Shin" title="Shin" href="tree/shin" coords="182,959,157,975,349,1305,375,1291" shape="poly" />
        <area alt="Tau" title="Tau" href="tree/tau" coords="385,1129,414,1130,414,1287,385,1286" shape="poly" />
      </map>
    </div>
  );
}

export default App;
