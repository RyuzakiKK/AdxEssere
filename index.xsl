<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="2.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:fn="http://www.w3.org/2005/xpath-functions"
    xmlns:xdt="http://www.w3.org/2005/xpath-datatypes"
    xmlns:err="http://www.w3.org/2005/xqt-errors"
    exclude-result-prefixes="xs xdt err fn">

    <xsl:output method="xml" indent="yes"/>
    
    <xsl:template match="/">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Adxessere-1</title>
        <link href="style.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <header>
            <h1>Elaborato di Sistemi Multimediali - Adxessere-1</h1>
        </header>
        <div id="container">
            <section id="controls">
                <div>
                    <h1>Ricerca per parola chiave</h1>
                    <label for="keyword">Keyword</label>
                    <input name="keyword" id="keyword" type="text" placeholder="keyword"/>
                    <button onclick="keyword(false)">Cerca</button>
                </div>
                <div>
                    <h1>Ricerca nelle vicinanze (GPS)</h1>
                    <label for="limitdistance">Limita la distanza a metri</label>
                    <select name="limitdistance" id="limitdistance">
                        <option value="80000">80000</option> <!-- Debug -->
                        <option value="5000">5000</option>
                        <option value="1000">1000</option>
                        <option value="500">500</option>
                        <option value="200">200</option>
                    </select>
                    <button onclick="geoloc()">Cerca</button>
                </div>
            </section>
            <section id="searchresult">
                <p id="error"></p>
                <ul>
                    <xsl:for-each select="contenuti/contenuto">
                        <li> <xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
                        <xsl:attribute name="class">locale</xsl:attribute>
                        <p class="lat"><xsl:value-of select="coordinateGPSlat"/></p>
                        <p class="long"><xsl:value-of select="coordinateGPSlong"/></p>
                        <p class="distanza"></p>
                        <xsl:for-each select="paroleChiave">
                            <p class="keyword"><xsl:value-of select="."/></p>
                        </xsl:for-each>
                        <xsl:for-each select="testoDescrittivo">
                            <p class="desc"><xsl:value-of select="."/></p>
                        </xsl:for-each>
                        <xsl:for-each select="linkEsterno">
                            <p><a>
                                <xsl:attribute name="href"><xsl:value-of select="."/></xsl:attribute>
                                <xsl:value-of select="."/>
                            </a></p>
                        </xsl:for-each>
                        <p><a>
                            <xsl:attribute name="href">http://www.google.com/maps/place/<xsl:value-of select="coordinateGPSlat"/>,<xsl:value-of select="coordinateGPSlong"/></xsl:attribute>Link a Google Maps</a>
                        </p>
                        </li>
                    </xsl:for-each>
                </ul>
            </section>
        </div>
        <footer>
            <p>Eugenio Severi</p>
            <p>Ludovico de Nittis</p>
        </footer>
        <script type="text/javascript" src="myscript.js">javascript</script>
    </body>
</html>
</xsl:template>
</xsl:stylesheet>
