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
            table-layout: fixed; /* equal column widths */
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
            word-wrap: break-word;
        }
        th {
            background-color: #d4af37;
            background-color: #e8e9eb;
        }
        .subtotal, .grand-total, .shortover {
            background-color: #d4af37;
            background-color: #e8e9eb;
            font-weight: bold;
        }
        .highlight {
            background-color: #ffff99;
            font-weight: bold;
        }

        /* Define column widths */
        th:nth-child(1), td:nth-child(1) { width: 20%; } /* PARTICULARS */
        th:nth-child(2), td:nth-child(2) { width: 15%; } /* AM */
        th:nth-child(3), td:nth-child(3) { width: 15%; } /* MID */
        th:nth-child(4), td:nth-child(4) { width: 15%; } /* PM */
        th:nth-child(5), td:nth-child(5) { width: 17.5%; } /* GROSS TOTAL */
        th:nth-child(6), td:nth-child(6) { width: 17.5%; } /* NET TOTAL */

.header {
    width: 100%;
    padding: 0px 0px;
    /* border: 2px solid black; */
    text-align: left;
}

.header img {
    height: 100px;
    /* border: 2px solid red; */
    display: inline-block; /* Ensures image stays inline */
    vertical-align: middle; /* Aligns with text */
}

.header .title {
    display: inline-block; /* Makes text block inline */
    vertical-align: middle; /* Aligns with image */
    text-align: right;
    font-size: 20px;
    font-weight: bold;
    /* border: 2px solid red; */
    width: 84%;
}

.header .title p{
    font-size: 14px; /* Reduce size to fit better */
}

    </style>
</head>
<body>
  <div class="header">
      <img src="{{ public_path('img/LogoIcon.png') }}" alt="Logo">
      <div class="title">
          <h3>Moneycache POS System</h3>
          <div class="containerp">
            <p>Pabayo-Hayes Street, Cagayan de Oro City</p>
            <p>0917 113 0904</p>
            
          </div>
      </div>
  </div>

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
          <td><strong>CASHIER'S NAME</strong></td>
          <td>{{ $am->cashier->name ?? 'cant get' }}</td>
          <td>{{ $mid->cashier->name ?? 'in db yet' }}</td>
          <td>{{ $pm->cashier->name ?? 'Cherry Lou' }}</td>
          <td></td>
          <td></td>
      </tr>

      @foreach ($totals as $total)
          <tr>
              <td>{{ $total['label'] }}</td>
              <td>{{ $total['am'] }}</td>
              <td>{{ $total['mid'] }}</td>
              <td>{{ $total['pm'] }}</td>
              <td>{{ $total['gross_total'] }}</td>
              <td>{{ $total['net_total'] }}</td>
          </tr>
      @endforeach

      {{-- SUB TOTAL TRADE POS --}}
      <tr class="subtotal">
          <td><strong>SUB TOTAL TRADE POS</strong></td>
          <td>{{ $sub_total_trade_am }}</td>
          <td>{{ $sub_total_trade_mid }}</td>
          <td>{{ $sub_total_trade_pm }}</td>
          <td>{{ $sub_total_trade }}</td>
          <td></td>
      </tr>

      {{-- SUB TOTAL NON-TRADE POS --}}
      <tr class="subtotal">
          <td><strong>SUB TOTAL NON-TRADE POS</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ $sub_total_non_trade }}</td>
          <td></td>
      </tr>

      {{-- GRAND TOTAL POS --}}
      <tr class="grand-total">
          <td><strong>GRAND TOTAL POS</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ $grand_total }}</td>
          <td></td>
      </tr>
  </tbody>
</table>

</body>
</html>
