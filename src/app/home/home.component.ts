import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import {BarcodeScanner} from 'nativescript-barcodescanner';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(
		private barcodeScanner: BarcodeScanner
	) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
	
	public onScanResult(evt) {
		// console.log(evt.object);
		console.log(`onScanResult: ${evt.text} (${evt.format})`);
	}
	
	public scanTapped(): void {
		let scan = () => {
		  this.barcodeScanner.scan({
			formats: "CODABAR",
			beepOnScan: true,
			reportDuplicates: true,
			preferFrontCamera: false
			// continuousScanCallback: scanResult => {
			//   console.log("result: " + JSON.stringify(scanResult));
			//   this.barcodeScanner.stop();
			// }
		  })
			  .then(result => console.log(JSON.stringify(result)))
			  .catch(error => console.log(error));
		};

		this.barcodeScanner.hasCameraPermission()
			.then(granted => granted ? scan() : console.log("Permission denied"))
			.catch(() => {
			  this.barcodeScanner.requestCameraPermission()
				  .then(() => scan());
        });
	}
}
