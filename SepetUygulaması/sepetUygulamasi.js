<!DOCTYPE html>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" ></script>
  <title>Kullanıcı Sepeti</title>
  <style>
  body {
    font-size: 19px;
  }
  form {
    width: 80%;
    height:100%; 
    margin: 50px auto;
    text-align: left;
    padding: 20px; 
    border: 1px solid #bbbbbb; 
    border-radius: 5px;
  }
  .Islemler{
    width: 80%;
    height:100%; 
    margin: 50px auto;
    text-align: left;
    padding: 20px; 

  }
  .form1 {
    width: 90%;
    height:50%; 
    margin: 50px auto;
    
    padding: 20px; 
    border: 1px solid #bbbbbb; 
    border-radius: 5px;
  }
  .div1 {
    width: 30%;
    border: 1px solid #bbbbbb; 
    border-radius: 5px;
  }
  .sepetEkle{

    text-align: right;

  }
  .div2 {
    width: 35%;
    border: 1px solid #bbbbbb; 
    border-radius: 5px;
  }
  .input-group {
    margin: 10px 0px 10px 0px;
  }
  .input-group label {
    display: block;
    text-align: left;
    margin: 2px;
  }
  label {
    display: block;
    color: #3c763d; 
    text-align: left;
    margin: 2px;
  }
  .input-group input {
    height: 30px;
    width: 20%;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid gray;
  }
  .btn {
    padding: 10px;
    font-size: 15px;
    color: white;
    background: #13F159;
    border: none;
    border-radius: 5px;
  }
  .btnArttir{

    border-radius: 0px 4px 4px 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 0px;

  }
  .btnAzalt{
    border-radius: 4px 0px 0px 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 4px;
  }
    #ana_div {
    height: 500px;
    width: 95%;

}
.divv {  
    float: left;
    height: 250px;
    width: 45%;
}
</style>

</head>
<body >

<div id="ana_div">
  <div class="divv" >
        <form >
      <div id="kullanici"></div>
    </form>

  </div>
  <div class="divv" >
    <div class="islemler" id="islemler">
    <div class="ucretYaz"> </div>
    <div><button class="btn" >ÖDEME YAP</button></div>
        </div>

  </div>

</div>

 
      <div id="urun_data" >   </div>

</body>	
<script >
  $(document).ready(function()
  {

   var odenecekToplamUcret=0;
   var ucret='';
    var userId;
    var adet=0;
    var urunListele='';
    if (window.openDatabase) {
        // VERİTABANINI OLUŞTUR
        var veritabani = openDatabase('sepetUygulaması', '1.0', 'Web SQL Veritabanı', 10*1024*1024);  
        console.log("local_veritabani isimli veritabanı 1.0 versiyonu ile 10MB olacak şekilde oluşturuldu veya zaten varsa yeniden oluşturulmadı!");
        getUrlValue();
       // tabloAdd();
        // KAYITLARI ÇEK VE LİSTELE
       // kayitlariOku();

     }else{
       alert("Maalesef tarayıcınızda Web SQL desteği bulunmamaktadır.")
     }

     function getUrlValue()
     {
      var SearchString = window.location.search.substring(1);
      userId = SearchString.split('?');
      kullaniciyiGetir(userId);
    }
    function kullaniciyiGetir(userId){
     veritabani.transaction(function(tx) {
      tx.executeSql('SELECT * FROM persons', [], function(islem, sonuc) {
        console.log("Kayıtlar listeleniyor:")
        console.log(sonuc.rows);
        jQuery.each(sonuc.rows, function(index, value) {
          console.log(value.id);

          if(value.id==userId){
            user_Id=value.id;
            var kullaniBilgisi='';
            kullaniBilgisi+='<label> <h2>Kullanıcı Bilgileri</h2></label>';
            kullaniBilgisi+='<div class="div2"> <span><label>Ürün Kullanıcı Adı:</label>'+value.name+'</span> </div>';
            kullaniBilgisi+='<div class="div2"> <span><label>Kullanıcı Soyadı:</label>'+value.surName+'</span> </div>';
            kullaniBilgisi+='<div class="div2"> <span><label>Kullanıcı User Name:</label>'+value.userName+' </span> </div>';
            $("#kullanici").append(kullaniBilgisi);
          }
        });
      });
    });
     sepeteEklenen();
   }


   function sepeteEklenen(){

     veritabani.transaction(function(tx) {
      tx.executeSql('SELECT * FROM sepetAdd WHERE userNameId=?', [userId], function(islem, sonuc) {
        console.log(sonuc.rows);
        jQuery.each(sonuc.rows, function(index, value) {
          //value.id  value.urunId    value.userNameId  value.sepetAddUrunAdet
          console.log(value.id);

          tx.executeSql('SELECT * FROM urun ', [], function(islem, sonuc){
            adet=0;
           jQuery.each(sonuc.rows, function(urunindex, urunValue){

            if(value.urunId==urunValue.id){
              adet++;

             while (adet<=1){
                adet++;
                urunListele='';
                urunListele+='<form class="form1">';
                urunListele+='<div class="div1"> <img src="'+urunValue.urunImg+'"/> </div>';
                urunListele+='<div class="div1"> <span><label>Ürün Adı:</label>'+urunValue.urunName+'</span> </div>';
                urunListele+='<div class="div1"> <span><label>Ürün Model:</label>'+urunValue.urunModel+' </span> </div>';
                urunListele+='<div class="div1"> <span><label>Fiyat:</label>'+urunValue.urunFiyat+' </span> </div>';
                urunListele+='<div class="input-group">';
                urunListele+='<button type="button" class="btnAzalt" title="Azalt" >-</button>';
                urunListele+='<button type="button" class="btnArttir" title="Arttır">+</button>';
                urunListele+='</div>';
                urunListele+='</form>';
                $("#urun_data").append(urunListele);
                console.log("Adet:"+adet);
               // console.log("ID:"+urunValue.userNameId)
               //odenecekToplamUcret+=urunValue.urunFiyat;
              }
               
            // ucret=' <span><label>Ödeyeceğiniz Ücret</label>'+odenecekToplamUcret+'</span>'  ;
          //   $("#ucretYaz").append(urunListele);

            }



          });


         });

        });
      });
    });



   }


     $(document).on('click', '#islemler', function() 
     {

     veritabani.transaction(function(tx) {
      tx.executeSql('SELECT * FROM sepetAdd WHERE userNameId=?', [userId], function(islem, sonuc) {
        console.log(sonuc.rows);
        jQuery.each(sonuc.rows, function(index, value) {
          //value.id  value.urunId    value.userNameId  value.sepetAddUrunAdet
       


        });
      });
    });


  }) ;

 });
</script>
</html>