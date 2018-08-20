<?php

if (isset($_GET["code"])) {
    echo "<hr>Authorization code received.<hr>";
    $authorizationCode = $_GET["code"];

    $url = "https://www.bungie.net/platform/app/oauth/token/";
    $apiKey = "e2079f9134244d5fa16f82241436d32f";
    $apiSecret = "W4xliQnbdTmUL4vWeSw6jQr1WyVPCkUc1Q-3Rks8NHY";
    $clientId = "24393";

    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, 'grant_type=authorization_code&code=' . $authorizationCode);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, $clientId . ':' . $apiSecret);

    $response = json_decode(curl_exec($curl), true);
    $responseCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $accessToken = $response['access_token'];
    
    curl_close($curl);

    echo 'HTTP Response Code: ' . $responseCode . '<hr>';

    if ($responseCode == 200) {
        echo 'Access token received. <hr>';

        $url = 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/';

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $url);
        // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('X-Api-Key: ' . $apiKey, 'Authorization: Bearer ' . $accessToken));

        $response = json_decode(curl_exec($curl), true);
        $responseCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);

        curl_close($curl);

        echo 'HTTP Response Code: ' . $responseCode . '<hr>';

        if ($responseCode == 200) {
            echo 'User memberships received. <hr>';

            $membershipType = $response['Response']['destinyMemberships'][0]['membershipType'];
            $membershipId = $response['Response']['destinyMemberships'][0]['membershipId'];
            $displayName = $response['Response']['destinyMemberships'][0]['displayName'];

            echo 'Display Name: ' . $displayName . '<br>';
            echo 'Membership Type: ' . $membershipType . '<br>';
            echo 'Membership Id: ' . $membershipId . '<hr>';

            $url = 'https://www.bungie.net/Platform/Destiny2/' . $membershipType . '/Profile/' . $membershipId . '/?components=100';

            $curl = curl_init();

            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array('X-Api-Key: ' . $apiKey, 'Authorization: Bearer ' . $accessToken));

            $json = curl_exec($curl);
            $response = json_decode($json, true);
            $responseCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);

            curl_close($curl);

            echo 'HTTP Response Code: ' . $responseCode . '<hr>';

            if ($responseCode == 200) {
                echo 'User profile received. <hr>';
    
                $userInfo = $response['Response']['profile']['data']['userInfo'];
                $dateLastPlayed = $response['Response']['profile']['data']['dateLastPlayed'];
                $versionsOwned = $response['Response']['profile']['data']['versionsOwned'];
                $characterIds = $response['Response']['profile']['data']['characterIds'];

                echo 'Date last played: ' . $dateLastPlayed . '<br>';
                echo 'Versions owned: ' . $versionsOwned . '<hr>';

                echo 'User info:';
                foreach ($userInfo as $key => $value) {
                    echo '<br>....' . $key . ': ' . $value;
                }

                echo '<hr>Character Ids:';
                for ($index = 0; $index < count($characterIds); $index++)
                {
                    echo '<br>....' . $characterIds[$index];

                    $url = 'https://www.bungie.net/Platform/Destiny2/' . $membershipType . '/Profile/' . $membershipId . '/Character/' . $characterIds[$index] . '/?components=200';

                    $curl = curl_init();

                    curl_setopt($curl, CURLOPT_URL, $url);
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($curl, CURLOPT_HTTPHEADER, array('X-Api-Key: ' . $apiKey, 'Authorization: Bearer ' . $accessToken));

                    $json = curl_exec($curl);
                    $response = json_decode($json, true);
                    $responseCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);

                    curl_close($curl);

                    if ($responseCode == 200) {
                        echo '<br>Character emblem:<br>';
                        echo '<img src="https://www.bungie.net/' . $response['Response']['character']['data']['emblemPath'] . '">';
                        echo '<br>Character emblem background:<br>';
                        echo '<img src="https://www.bungie.net/' . $response['Response']['character']['data']['emblemBackgroundPath'] . '">';
                        echo '<br>Character light level: ' . $response['Response']['character']['data']['light'] . '<hr>';

                    }
                }
            }
        }
    }
    echo '<hr>';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Destiny 2 Super Companion | Test Site</title>
</head>
<body>
    <h1>
      <a href="https://www.fotosim.co.uk/index.php">Destiny 2 Super Companion</a>
    </h1>
    <div id="logInBtn">
      <h2>Click below to authorize and log-in with Bungie.net</h2>
    <a href="https://www.bungie.net/en/oauth/authorize?client_id=24393&response_type=code">Log-In</a>
    </div>
</body>
</html>