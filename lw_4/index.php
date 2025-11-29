<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lw_4 (Check Visits)</title>
</head>
<body>
    <?php
        $path = 'countVisits.txt';
        $handle = fopen($path, "r");
        if ($handle == false) {
            echo "File $path not found.";
        }
        $counter = (int)fgets($handle, 10);
        fclose($handle);

        $handle = fopen($path, "w");
        if ($handle == false) {
            echo "File $path not found.";
        }
        $counter++;

        fputs($handle, $counter);
        fclose($handle);

        echo '<h3>Welcome to the test site!</h3>';
        echo "<p>This site has been visited for $counter time(s) already.</p>";
     ?>
</body>
</html>