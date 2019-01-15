#!/bin/bash

keyStore=arqonia_https.jks
alias=arqonia_https
password=pass123
csrFile=arqonia_https.csr

caCertificate=arqonia_ca_certificate.pem
caKey=arqonia_ca_key.pem

certificateName=arqonia_https_certificate.cer

keytool -keystore $keyStore -genkey -dname "CN=arqonia.pl, OU=Arqonia, O=Arqonia, L=Poznan, ST=Wielkopolska, C=PL" \
    -alias $alias -storepass $password -keypass $password

keytool -keystore $keyStore -certreq -alias $alias -keyalg rsa -storepass $password -keypass $password -file $csrFile

mkdir private

openssl req -new -x509 -days 3650 -extensions v3_ca \
    -subj "/C=PL/ST=Wielkopolska/L=Poznan/O=Arqonia/OU=Arqonia/CN=arqonia.pl" \
    -passout pass:$password -keyout private/$caKey -out $caCertificate

openssl x509 -req -CA $caCertificate -CAkey private/$caKey \
    -in $csrFile -out $certificateName -days 3650 -CAcreateserial
