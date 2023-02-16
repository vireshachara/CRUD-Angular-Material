import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CRUD';
  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'freshness',
    'price',
    'comment',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '35%',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        // this.dataSource = new MatTableDataSource(res);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        console.log(res);
      },
    });
  }
}

// this.api.getProduct().subscribe({
//   next:(res)=>{
//     this.dataSource = new MatTableDataSource(res);
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   },
//   error: () => {
//           alert('Error while fetching the Record');
//         },
// })
