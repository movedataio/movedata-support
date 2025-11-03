# Uninstalling MoveData

## Summary <a href="#h_3da33ab1aa" id="h_3da33ab1aa"></a>

1. Uninstall Customisations such as Flows
2. Uninstall MoveData Extensions packages
3. Uninstall MoveData

## Detailed Explanation <a href="#h_ffcdfc6d57" id="h_ffcdfc6d57"></a>

To uninstall MoveData, navigate to `Setup -> Apps -> Packaging -> Installed Packages`.

<figure><img src="../.gitbook/assets/Installed Packages.png" alt=""><figcaption></figcaption></figure>

You should see MoveData and any MoveData extensions that are installed listed here. Before you can uninstall MoveData, you must remove all dependant extension packages first. These include the `MoveData NPSP Extensions`, `MoveData Commerce Extensions`, `MoveData Non-Profit Cloud Extensions` and `MoveData Forms Extensions`.

<figure><img src="../.gitbook/assets/Flow List View.png" alt=""><figcaption></figcaption></figure>

You will also need to removed any customisations such as Lightning Flows that are dependant on these packages. These are often prefixed with `[MoveData Extension]`.

To uninstall, click `Uninstall` and progress to the confirmation screen. At the bottom of the page, you will see a set of options before you can progress the uninstall.

<figure><img src="../.gitbook/assets/Uninstall.png" alt=""><figcaption></figcaption></figure>

We always suggest you select `Save a copy of this package's data for 48 hours after uninstall`. Click `Yes, I want to uninstall this package and permanently delete all associated components`. Click `Uninstall` to begin the process.

<figure><img src="../.gitbook/assets/Uninstall Failed.png" alt=""><figcaption></figcaption></figure>

f you have not removed all dependencies, you see a page listing all dependencies that must be addressed before the uninstall can proceed. Once these have been addressed, you will need to try again.
