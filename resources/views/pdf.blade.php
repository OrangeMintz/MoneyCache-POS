<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cashier Report</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #d4af37;
        }
        .subtotal, .grand-total, .shortover {
            background-color: #d4af37;
            font-weight: bold;
        }
        .highlight {
            background-color: #ffff99;
            font-weight: bold;
        }
    </style>
</head>
<body>

<table>
    <thead>
        <tr>
            <th>PARTICULARS</th>
            <th>AM</th>
            <th>MID</th>
            <th>PM</th>
            <th>GROSS TOTAL</th>
            <th>NET TOTAL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>CASHIER'S NAME</td>
            <td>cherry</td>
            <td></td>
            <td>criste</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Cash</td>
            <td>63,608.00</td>
            <td></td>
            <td>38,168.00</td>
            <td>101,776.00</td>
            <td>101,776.00</td>
        </tr>
        <tr>
            <td>Check</td>
            <td>63,608.00</td>
            <td></td>
            <td>38,168.00</td>
            <td>101,776.00</td>
            <td>101,776.00</td>
        </tr>
        <tr>
            <td>BPI Credit Card</td>
            <td>5,022.00</td>
            <td></td>
            <td>10,026.89</td>
            <td>15,048.89</td>
            <td>14,627.52</td>
        </tr>
        <tr>
            <td>BPI Debit Card</td>
            <td>5,022.00</td>
            <td></td>
            <td>10,026.89</td>
            <td>15,048.89</td>
            <td>14,627.52</td>
        </tr>
        <tr>
            <td>Metro Credit Card</td>
            <td>5,022.00</td>
            <td></td>
            <td>10,026.89</td>
            <td>15,048.89</td>
            <td>14,627.52</td>
        </tr>
        <tr>
            <td>Metro Debit Card</td>
            <td>5,022.00</td>
            <td></td>
            <td>10,026.89</td>
            <td>15,048.89</td>
            <td>14,627.52</td>
        </tr>
        <tr>
            <td>Pay Maya</td>
            <td>16,510.67</td>
            <td></td>
            <td>7,835.71</td>
            <td>24,346.38</td>
            <td>23,798.59</td>
        </tr>
        <tr>
            <td>AUB Credit Card</td>
            <td>16,510.67</td>
            <td></td>
            <td>7,835.71</td>
            <td>24,346.38</td>
            <td>23,798.59</td>
        </tr>
        <tr>
            <td>GCash</td>
            <td>3,108.00</td>
            <td></td>
            <td>3,345.00</td>
            <td>6,453.00</td>
            <td>6,356.21</td>
        </tr>
        <tr>
            <td>Food Panda</td>
            <td></td>
            <td>1,520.00</td>
            <td>pndapro/card</td>
            <td>1,520.00</td>
            <td>1,140.00</td>
        </tr>
        <tr>
            <td>StreetBy</td>
            <td></td>
            <td>1,520.00</td>
            <td>pndapro/card</td>
            <td>1,520.00</td>
            <td>1,140.00</td>
        </tr>
        <tr>
            <td>Grab Food</td>
            <td></td>
            <td></td>
            <td>2,759.00</td>
            <td>2,759.00</td>
            <td>2,207.20</td>
        </tr>
        <tr>
            <td>GC Claimed (Others)</td>
            <td></td>
            <td>1,520.00</td>
            <td>pndapro/card</td>
            <td>1,520.00</td>
            <td>1,140.00</td>
        </tr>
        <tr>
            <td>GC Claimed (Own)</td>
            <td></td>
            <td></td>
            <td>2,759.00</td>
            <td>2,759.00</td>
            <td>2,207.20</td>
        </tr>
        <tr class="subtotal ">
            <td>SUB TOTAL TRADE POS</td>
            <td>88,248.67</td>
            <td>4,279.00</td>
            <td>59,375.60</td>
            <td>151,903.27</td>
            <td>149,905.51</td>
        </tr>
        <tr>
            <td>MM-Head Office</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>MM-Commissary</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>MM-RM</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>MM-DM</td>
            <td></td>
            <td>60.00</td>
            <td></td>
            <td>60.00</td>
            <td>60.00</td>
        </tr>
        <tr>
            <td>MM-KM</td>
            <td></td>
            <td>60.00</td>
            <td></td>
            <td>60.00</td>
            <td>60.00</td>
        </tr>
        
        <tr class="subtotal">
            <td>SUB TOTAL NON-TRADE POS</td>
            <td></td>
            <td>60.00</td>
            <td></td>
            <td>60.00</td>
            <td></td>
        </tr>
        <tr class="grand-total">
            <td>GRAND TOTAL POS</td>
            <td>88,248.67</td>
            <td>4,339.00</td>
            <td>59,375.60</td>
            <td>151,963.27</td>
            <td>149,965.51</td>
        </tr>
        <tr>
            <td>Z READING POS</td>
            <td>88,248.58</td>
            <td>60.00</td>
            <td>59,375.56</td>
            <td>147,624.14</td>
            <td>147,624.14</td>
        </tr>
        <tr class="shortover">
            <td>SHORT/OVER POS</td>
            <td>0.09</td>
            <td>4,279.00</td>
            <td>0.04</td>
            <td>4,279.13</td>
            <td>2,347.37</td>
        </tr>
    </tbody>
</table>

</body>
</html>
