<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function inventory() {
        return $this->belongsTo(Inventory::class, 'inventory_id');
    }
    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
